import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import { MenuItem, Select } from '@mui/material';
import axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper'


import "leaflet/dist/leaflet.css";
import { red } from '@mui/material/colors';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geoJsonLayer = useRef(null);
  const airports = [
    {value: 'London Heathrow Airport', text: 'London Heathrow Airport (England)'},
    {value: 'New York John F. Kennedy Airport', text: 'New York John F. Kennedy Airport (USA)'},
    {value: 'Kapstadt International Airport', text: 'Kapstadt International Airport (Südafrika)'},
    {value: 'Buenos Aires Ezeiza Airport', text: 'Buenos Aires Ezeiza Airport (Argentinien)'},
    {value: 'Dubai International Airport', text: 'Dubai International Airport (Vereinigten Arabischen Emirate)'},
    {value: 'Zurich Flughafen', text: 'Zürich Flughafen (Schweiz)'},
    {value: 'Palma de Mallorca Aeroport de Son Sant Joan', text: 'Palma de Mallorca Aeroport de Son Sant Joan (Spanien)'},
  ]
  const [fin, setfinn] = useState(airports[0].value);
  const [fout, setfoutt] = useState(airports[1].value);
  const mystyle = {padding: 4}
  const mystyle1 = {margin: 8}
  const mystyle2 = {color: "red"}
  const mystyle3 = {padding: 4}
  const mystyle4 = {marginLeft: 15}

  const style = { 
    appBar: { 
        padding: 5,
        
    }, 
    paper: {
        color: "black", 
        margin: 5, 
        padding: 4,
        fontSize:'30px',   
    }
}


  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    do_download1([-0.18263989409720086,51.15235296503555, -73.78466299589385,40.64583089596164]);
    }, []);

  useEffect(() => {
    if (geoJsonLayer.current) {
        geoJsonLayer.current.clearLayers().addData(data);
      }
  }, [data]);

  function do_download1(arry) {
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${arry[1]}&startlng=${arry[0]}&endlat=${arry[3]}&endlng=${arry[2]}&pts=300`;

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError("ERROR API Aufruf fehlgeschlagen");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getCord(place) {
    if (place === "London Heathrow Airport") {
      return [-0.451967, 51.470035]
    } else if (place === "New York John F. Kennedy Airport") {
      return [-73.784413, 40.643170]
    } else if (place === "Kapstadt International Airport") {
      return [18.599725, -33.971036]
    } else if (place === "Buenos Aires Ezeiza Airport") {
      return [-58.543104, -34.810920]
    } else if (place === "Dubai International Airport") {
      return [49.823257, 26.460090]
    } else if (place === "Zurich Flughafen") {
      return [8.562591816333036,47.45048786731165]
    } else if (place === "Palma de Mallorca Aeroport de Son Sant Joan") {
      return [2.725343, 39.545208]
    }

  }

  function setfin(ffin) {
    setfinn(ffin)
    if (fout !== null && ffin !== fout){
      setError(null)
      do_download1(getCord(ffin).concat(getCord(fout)))
    } else if (fout === ffin) {
      setError("Start- und Zielflughafen können nicht identisch sein, bitte wählen Sie ein anderer Start- oder Zielflughafen!")
      
      do_download1(getCord(ffin).concat(getCord(fout)))
    }

  }

  function setfout(ffout) {
    setfoutt(ffout)
    if (fin !== null && fin !== ffout) {
      setError(null)
      do_download1(getCord(fin).concat(getCord(ffout)))
    } else if (ffout === fin) {
      setError("Start- und Zielflughafen können nicht identisch sein, bitte wählen Sie ein anderer Start- oder Zielflughafen!")
      
      do_download1(getCord(fin).concat(getCord(ffout)))
    }

  }

  return (
    <>
    <AppBar position='sticky' color="primary" style={style.appBar}> 
            <Toolbar > 
            <Grid container justifyContent="flex-start"  > 
                
                </Grid>

                
            <div class="new-nav">
            <Grid container justifyContent="flex-end"  background-color="primary"> 
            <Grid item xs={12} sm={6} md='flex' > 
            <Paper>
            <Typography style={style.paper}>FLUGPLAN</Typography> 
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md='flex' > 
            <Paper>

      <label for="airport-in" style={mystyle3}><strong>Wählen Sie ihren Flug:</strong></label>
      </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md='flex' > 
            <Paper>
      
      
            
      <label for="airport-in" style={mystyle}>Startdestination</label>
      <Select id="airport-in" style={mystyle1} size="6" value={fin} onChange={o => setfin(o.target.value)}>
        {airports.map(airport => (<MenuItem key={airport.value} value={airport.value}>{airport.text}</MenuItem>))}
      </Select>
      </Paper>
            </Grid>
          
            <Grid item xs={12} sm={6} md='flex'> 
            <Paper>
      
      <label for="airport-out" style={mystyle}>Zieldestination</label>
      <Select id="airport-out" style={mystyle1} size="6" value={fout} onChange={o => setfout(o.target.value)}>
        {airports.map(airport => (<MenuItem key={airport.value} value={airport.value}>{airport.text}</MenuItem>))}
      </Select>
      </Paper>
      </Grid>
      </Grid> 
    </div>
                
            
            </Toolbar>
        </AppBar>
    

      {error &&   <>
                    <div id="div-error" style={mystyle2}>{error}</div><br/>
                  </>}

      {data &&  <>
        <MapContainer center={[32.421975, 8.533351]} zoom={2} scrollWheelZoom={true} worldCopyJump={true} minZoom={2}
                    style={{ height: "593px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
              <GeoJSON data={data} ref={geoJsonLayer} style={{ weight: 8, opacity: '30%', color: 'green'}}/>
      </MapContainer>
      <Typography variant="body2" style={mystyle4}>Erstellt von Andrea Bricalli, Fabian Waltisberg, Jonas Wörgau</Typography>
      
                </>}

      </>
  );
}

export default App;