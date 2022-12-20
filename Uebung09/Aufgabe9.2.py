import pyproj
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.responses import PlainTextResponse
import uvicorn

app = FastAPI()

# https://vm1.sourcelab.ch/geodetic/line?startlat=47.5349&startlng=7.6415&endlat=8.9738&endlng=-79.5068&pts=20


@app.get("/geodetic/source", response_class=PlainTextResponse)
async def source():
    with open("geodetic.py", encoding="utf-8") as f:
        return f.read()

@app.get("/geodetic", response_class=HTMLResponse) 
async def help():
    return """<h1>Help</h1>
    <h2>LineString</h2>
    <a href="/geodetic/line?startlat=47.5349&startlng=7.6415&endlat=8.9738&endlng=-79.5068&pts=20">/geodetic/line?startlat=47.5349&startlng=207.6415&endlat=8.9738&endlng=-79.5068&pts=20</a>
    <h2>MultiPoint</h2>
    <a href="/geodetic/point?startlat=47.5349&startlng=7.6415&endlat=8.9738&endlng=-79.5068&pts=20">/geodetic/point?startlat=47.5349&startlng=207.6415&endlat=8.9738&endlng=-79.5068&pts=20</a>
    """

@app.get("/geodetic/line", response_class=JSONResponse) 
async def geodeticline(startlat: float, startlng: float, endlat: float, endlng: float, pts: int):
    g = pyproj.Geod(ellps="WGS84")

    if pts<3:
        return {"error": "not enough points, minimum is 3"}

    if pts>1024:
        return {"error": "too many points, maximum is 1024"}

    lonlats = g.npts(startlng, startlat, endlng, endlat, pts-2)

    lonlats = [[startlng, startlat]] + [list(i) for i in lonlats] + [[endlng, endlat]]

    geojson = {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": lonlats
        },
        "properties": {
            "info": "geodätische Linie"
        }
    }

    return geojson

@app.get("/geodetic/point", response_class=JSONResponse) 
async def geodeticline(startlat: float, startlng: float, endlat: float, endlng: float, pts: int):
    g = pyproj.Geod(ellps="WGS84")

    if pts<3:
        return {"error": "not enough points, minimum is 3"}

    if pts>1024:
        return {"error": "too many points, maximum is 1024"}

    lonlats = g.npts(startlng, startlat, endlng, endlat, pts-2)

    lonlats = [[startlng, startlat]] + [list(i) for i in lonlats] + [[endlng, endlat]]

    geojson = {
        "type": "Feature",
        "geometry": {
            "type": "MultiPoint",
            "coordinates": lonlats
        },
        "properties": {
            "info": "geodätische Linie"
        }
    }

    return geojson


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002)
