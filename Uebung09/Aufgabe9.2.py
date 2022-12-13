import uvicorn
from pyproj import Transformer 
from fastapi import FastAPI 
app = FastAPI()

import pyproj 

g = pyproj.Geod(ellps='WGS84')



@app.get("/geodetic/") 
async def read_item(startlong: float = 0, startlat: float = 0, endlong: float = 0, endlat: float = 0):
    lonlats = g.npts(startlong, startlat, endlong, endlat, 30)

    lonlats = [[startlong, startlat]] + [list(i) for i in lonlats] + [[endlong, endlat]]
    ## add start and end point
    return {"Koordinaten als Tuple zu verwenden": lonlats}

if __name__ == "__main__": 
    uvicorn.run(app, host="127.0.0.1", port=8002, root_path="/geodetic")