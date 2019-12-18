import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/bottomcard.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import Card from '@material-ui/core/Card';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="maindiv">
      <Center style={{height:"100%"}}>
      {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <div className="App">
          <div className="maincard">
            <div className="memberone">
              <div className="namememberone">
                Akshay Padte 
              </div>
              <div className="emailmemberone">
                akshay.padte@somaiya.edu
              </div>
              <Button variant="contained" color="primary" className="leadermember" >Leader </Button>
            </div>
          </div>
      </div> */}
      <Grid container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}>

      <Grid item xs={5}>
        <Grid container 
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}>

          <Grid item xs={10}>
          <TextField
          id="outlined-read-only-input"
          label="Team Name"
          defaultValue="Team Probably"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
          </Grid>

          <Grid item xs={10}>
          <TextField
          id="outlined-read-only-input"
          label="Team Code"
          defaultValue="ABC4D2H"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
          </Grid>

          <Grid item xs={10}>
          <Button style={{width:"100%"}} variant="contained" color="primary">Add member</Button>
          </Grid>

          <Grid item xs={10}>
          <Button style={{width:"100%"}} variant="contained" color="secondary">Exit team</Button>
          </Grid>
        </Grid>
        </Grid>
      
      <Grid item xs={7}>
        <Grid container 
        direction="column"
        spacing={3}>
          <Grid item xs={10}>
            <Card style={{height:"150%"}} >Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span><span className="rightags"></span></Card>
          </Grid>
          <Grid item xs={10}>
            <Paper width="100%" >Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={{height:"130%"}}>Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={{height:"130%"}}>Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={{height:"130%"}}>Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={{height:"130%"}}>Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={{height:"130%"}}>Akshay Padte<span className="emailmember">akshay.padte@somaiya.edu</span></Paper>
          </Grid>
        </Grid>
        </Grid>
        
      </Grid>
      </Center>
      </div>
    );
  }
}

export default App;
