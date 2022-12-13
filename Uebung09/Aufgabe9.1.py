import uvicorn
from pyproj import Transformer 
from fastapi import FastAPI 
app = FastAPI()

wgs84= "epsg:4326" 
lv95= "epsg:2056" 

transformer1 = Transformer.from_crs("epsg:4326", "epsg:2056")
transformer2 = Transformer.from_crs("epsg:2056", "epsg:4326") 


@app.get("/transform/lv95wgs84") 
async def read_item(lng: float = 0, lat: float = 0):
    return {"Transformiert koordinaten von LV95 zu WGS84": transformer2.transform(lng, lat)}

@app.get("/transform/wgs84lv95") 
async def read_item(lng: float = 0, lat: float = 0):
    return {"Transformiert koordinaten von WGS84 zu LV95": transformer1.transform(lng, lat)}

if __name__ == "__main__": 
    uvicorn.run(app, host="127.0.0.1", port=8001, root_path="/transform")

