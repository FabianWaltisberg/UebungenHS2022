import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography"; 


import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayersControl, LayerGroup} from 'react-leaflet'


function App() {


  const style = { 
    appBar: { 
        padding: 5,
        
    }, 
    paper: {
        color: "white", 
        margin: 5, 
        padding: 4,
        
        fontSize:'30px',
      
        
    }
}

 


  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

  
    
    

  }, []);

return (
<>
  <AppBar position='sticky' color="error" style={style.appBar}> 
            <Toolbar > 
                <Grid container justifyContent="flex-start" > 
                <Typography style={style.paper}>KARTE DER SCHWEIZER ATOMKRAFTWERKE</Typography> 
                </Grid>

                <Grid container justifyContent="flex-end"> 
                
            </Grid> 
            </Toolbar>
        </AppBar>

  <MapContainer center={[47.1376, 8.4326]} zoom={8} scrollWheelZoom={true}>
  <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://de.wikipedia.org/wiki/Datendiebstahl">Map made by Fabian Waltisberg'
       />

    

  <LayersControl position='topright'>
    <LayersControl.Overlay  checked name = 'Atomkraftwerk Leibstadt'>
      <LayerGroup>
  <Marker position={[47.6013, 8.1837]}>
    <Popup>
      AKW Leibstadt<br/>Eigentümer: Kernkraftwerk Leibstadt AG<br/>Betriebnahme: 1984
    </Popup>
    <Circle center = {[47.6013, 8.1837]} radius = {50000} color = {'green'}/> //Leibstadt
  </Marker>
  </LayerGroup>
  </LayersControl.Overlay>
  
  <LayersControl.Overlay  checked name = 'Atomkraftwerk Gösgen'>
      <LayerGroup>
  <Marker position={[47.3658, 7.9689]}>
    <Popup>
      AKW Gösgen<br/>Eigentümer: Kernkraftwerk Gösgem-Däniken AG <br/>Betriebnahme: 1979
    </Popup>
    <Circle center = {[47.3658, 7.9689]} radius = {50000} color = {'red'}/> // Gösgen
  </Marker>
  </LayerGroup>
  </LayersControl.Overlay>

<LayersControl.Overlay  checked name = 'Atomkraftwerk Mühleberg'>
      <LayerGroup>
  <Marker position={[46.9708, 7.2702]} color='error'>
    <Popup>
      AKW Mühleberg<br/>Eigentümer: BKW Energie AG <br/>Betriebnahme: 1972 <br/>Stilllegung: 2019
    </Popup>
    <Circle center = {[46.9708, 7.2702]} radius = {50000} color = {'magenta'}/> // Mühleberg
  </Marker>
  </LayerGroup>
  </LayersControl.Overlay>

  <LayersControl.Overlay  checked name = 'Atomkraftwerk Beznau'>
      <LayerGroup>
  <Marker position={[47.5522, 8.2277]}>
    <Popup>
      AKW Beznau<br/>Eigentümer: Axpo AG <br/>Betriebnahme: 1969
    </Popup>
    <Circle center = {[47.5522, 8.2277]} radius = {50000} color = {'yellow'}/>  // Beznau
  </Marker>
  </LayerGroup>
  </LayersControl.Overlay>
  </LayersControl>
  
  

</MapContainer>
  </>);
}

export default App;