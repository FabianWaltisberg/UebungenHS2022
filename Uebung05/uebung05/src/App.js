import React from 'react';
import Timer from './Timer';
import Grid from '@mui/material/Grid' 
import Typography from "@mui/material/Typography"; 
import Toolbar from "@mui/material/Toolbar"; 
import AppBar from "@mui/material/AppBar";
import TextField from '@mui/material/TextField';
import Timergui_ss from './Timergui_ss';



import Timer_fw_fertig from './Timer_fw_fertig'

const style = { 
    appBar: { 
        padding: 1,
    }, 
    paper: {
        backgroundColor: "black", 
        color: "white", 
        margin: 5, 
        padding: 4,
    }
}


function App() {
    return (
    <>
        <AppBar position='sticky' color="secondary" style={style.appBar}> 
            <Toolbar> 
                <Grid container justifyContent="flex-start"> 
                <Typography>Counter</Typography> 
                </Grid>

                <Grid container justifyContent="flex-end"> 
                
            </Grid> 
            </Toolbar>
        </AppBar>

        <Timer countdown = "10"></Timer>

        <Timergui_ss></Timergui_ss>   
           
        
        
       


        <Timer_fw_fertig></Timer_fw_fertig>

        
        
       
        </>);
}

export default App;