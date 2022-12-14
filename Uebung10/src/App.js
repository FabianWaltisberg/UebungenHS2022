import React, { useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import 'leaflet/dist/leaflet.css';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function App() {
  const [data, setData] = useState(null);
  const [startLat, setStartLat] = useState(1)
  const [startLon, setStartLon] = useState(1)
  const [endLat, setEndLat] = useState(1)
  const [endLon, setEndLon] = useState(1)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [pkt, setPkt] = useState(100)
  const geoJsonLayer = useRef(null);


  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);

  useEffect(() => {
   if(geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(data)
    }
  }, [data]);

    function reload() {
      window.location.reload();
    }

  function do_download() {
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${startLat}&startlng=${startLon}&endlat=${endLat}&endlng=${endLon}&pts=100`;
   
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (
    <>
       <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant='h4'>Geodetic Line</Typography>
                
            </Toolbar>
           
            </AppBar>
            <br/>

      <Grid container spacing={2}>
          <Grid container item xs={6} spacing={-8}>
            <Grid item xs={2}>
                <h3>Startpunkt:</h3>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Startpunkt Lat" variant="outlined" onChange={(e) => setStartLat(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Startpunkt Lon" variant="outlined" onChange={(e) => setStartLon(e.target.value)} />
            </Grid>
          </Grid>

          <Grid container item xs={6} spacing={-8}>
            <Grid item xs={2}>
                <h3>Endpunkt:</h3>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Endpunkt Lat" variant="outlined" onChange={(e) => setEndLat(e.target.value)}/>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Endpunkt Lon" variant="outlined" onChange={(e) => setEndLon(e.target.value)}/>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" onClick = { () => {do_download()}}>
            Convert
            </Button><p/>
            <Button variant="contained" onClick={() => { reload() }}>Reset</Button>
          </Grid>
        </Grid>

      {loading && <>
                     <div>API Aufruf, bitte warten!</div><br/>
                  </>
      }

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      
          <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }} >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
          {data &&  <> <GeoJSON data={data} style={{ weight: 8, opacity: '50%', color: 'blue'}}/></>}

          </MapContainer>
                
  
      </>
  );
}

export default App;