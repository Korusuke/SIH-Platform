import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './bottomcard.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import ReactDOM from 'react-dom';



class App extends Component {
  constructor(props)
  {
    super();
    this.props = props;
    this.state = {
    
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event)
  {
    let {name, type, value, checked} = event.target
    
    type != "checkbox"? this.setState(
      {
        [name] : value
      }
    ): this.setState(
      {
        [name]: checked
      }
    )
    
    console.log(name,value);
}

  render() {
    return (
      <div className="maindiv">
        <Center style={{height:"100%"}}>
      {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <div className="App">
          <div className="maincard">
          <TextField className="inputCent" id="teamcode" label="Team code" variant="outlined" />
          <Button variant="contained" className="inputConf" color="primary">Confirm</Button>
          </div>
      </div> */}
      <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={8}>
        <Grid item xs={6} >
        <TextField name="teamname" id="teamname" label="Team name" variant="outlined" 
        onChange = {this.handleChange} />
        </Grid>
        <Grid item xs={12} align="center">
        <Button style={{width:"100%"}} variant="contained" color="primary">Confirm</Button>
        </Grid>
      </Grid>
      </Center>
      </div>
    );
  }
}

export default App;