import uvicorn

import sqlalchemy
import databases
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates

from fastapi import FastAPI, Depends, status
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException

database = databases.Database('sqlite:///datenbank.db')
engine = sqlalchemy.create_engine('sqlite:///datenbank.db', 
            connect_args={"check_same_thread": False})
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes", metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String)
)

metadata.create_all(engine)

app = FastAPI()
templates = Jinja2Templates(directory="templates/")


manager = LoginManager("jsk2e1urh3fku371", token_url="/auth/login", use_cookie=True)
manager.cookie_name = "ch.fhnw.testapp_hezd736"

DB = {"user1": {"name": "Hans Muster", 
                "email": "hanswurst@gmail.com",
                "passwort": "12345"},
      "user2" : {
                "name": "Alexandra Meier",
                "email": "ameier@gmx.net",
                "passwort": "pass"}
    }

@manager.user_loader()
def load_user(username: str):
    user = DB.get(username)
    return user


@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)

    if not user:
        raise InvalidCredentialsException
    if user['passwort'] != password:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(
        data = {"sub": username}
    )

    resp = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp, access_token)

    return resp

@app.get("/login")
def login():
    file = open("templates/login.html", encoding="utf-8")
    data = file.read()
    file.close()
    return HTMLResponse(content=data)


@app.on_event("startup")
async def startup():
    print("Verbinde Datenbank")
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    print("Beende DB Verbindung")
    await database.disconnect()

@app.get("/users/{username}")
async def read_notes():
    query = notes.select()
    return await database.fetch_all(query)

@app.get("/new")
async def create_note(request: Request):
    return templates.TemplateResponse('form.html', context={'request': request})

@app.post("/new")
async def post_note(titel=Form(), text=Form()):
    query = notes.insert().values(title=titel, text=text)
    myid = await database.execute(query)
    
    resp1 = RedirectResponse(url="/new", status_code=status.HTTP_302_FOUND)

    return resp1

uvicorn.run(app, host="127.0.0.1", port=8000)