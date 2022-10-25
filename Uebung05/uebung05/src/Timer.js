import React, {Component} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Step } from "@mui/material";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {count: props.countdown, msg: "", render: true};
        this.interval = null;
       
    
        // Event-Handler registrieren:
        this.update = this.update.bind(this);
        this.start_timer = this.start_timer.bind(this);
        
        
    }

    update() {
        this.setState({ count: this.state.count - 1 });
        if (this.state.count <= 1) {
            this.setState({msg: "Die Uhr ist heruntergelaufen"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = null;
            this.setState({render: !this.state.render});
        }
    }

    start_timer() {
        this.setState({count: this.props.countdown, msg: ""});
        this.setState({render: !this.state.render});

        if (this.interval != null)
        {
            clearInterval(this.interval);
        }

        this.interval = setInterval(this.update, 1000);

    }


    render() {
        return (
        <>
            {this.state.render &&  
             <Grid style={{margin: 20}}>
            <TextField id="outlined-basic" label="Geht nicht" variant="outlined" type='number' step='1' onChange={this.state.countdown}  />
            </Grid>

            }

            
            <p>{this.state.count}</p>
            <p>{this.state.msg}</p>
            <Button  variant="contained" onClick={this.start_timer}>Los</Button>
          

            <Grid container style={{margin: 20}}> 
            <Grid style={{margin: 20}}> 
            
                
            </Grid> 
            </Grid>
    
            
            <hr/>
        </>)
    }
}

export default Timer;
