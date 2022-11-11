import uvicorn
from fastapi import FastAPI

L = []

app = FastAPI()

d = {}
file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
    daten = line.strip().split(";")
    ort = daten[0]
    zip = daten[1]
    zusatzziffer = daten[2]
    gemeinde = daten[3]
    bfsnr = daten[4]
    kanton = daten[5]
    ost = daten[6]
    nord = daten[7]
    sprache = daten[8]
    d[gemeinde] = {"Ort": ort, "PLZ": zip, "Zusatzziffer": zusatzziffer, "Gemeinde": gemeinde,"BFS-NR": bfsnr, "Kanton": kanton, "Ost-Koordinaten": ost, "Nord-Koordinaten": nord, "Sprache": sprache}

file.close()

@app.get("/gemeindenamen")
async def gemeindenamen(gemeindenamen: str):
    if gemeindenamen in d:
        return d[gemeindenamen]
    

    return{"ERROR": "Gemeinde NOT FOUND"}

uvicorn.run(app, host="127.0.0.1", port=8000)