import React, {Component} from "react";

class Uhr extends Component {
    constructor(props) {
        super(props);

        this.state = {count: 50};
        this.update = this.update.bind(this);


        // Event-Handler registrieren 
        
        this.handleChange = this.handleChange.bind(this); 
        this.handleClick = this.handleClick.bind(this);
    }

        handleChange(event) { 
            this.setState({count: event.target.value});
    }

        handleClick(event) {
            this.setState({count: 50});  
    }

    componentDidMount() {
        this.interval = setInterval(this.update, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        this.setState({count: this.state.count - 1});
    }

   

    

    render() {
        return (<>
             <h1>Uhr mit 50 Sekunden</h1>
             {this.state.count} <br/>
            <button onClick={this.handleClick}>Los gehts mit dem Abenteuer</button>
            <p>Dies ist meine Lösung</p>
        </>);
    }

}

export default Uhr;