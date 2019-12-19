import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/bottomcard.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import ReactDOM from 'react-dom';

export default class bottomcardfirst extends Component {
  render() {
    return (
      <div className="maindiv">
          <Center style={{height:"100%"}}>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          {/* <div className="maincard">
          <Button variant="contained" className="leftbutton" color="primary">Join Team</Button>
          <div className="midtext">OR</div>
          <Button variant="contained" className="rightbutton" color="primary">Create Team</Button>
          </div> */}
          <Grid container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={0}
    >
        <Grid item xs={4} align="center">
        <Button variant="contained" className="leftbutton" color="primary" onClick={()=>{this.props.changeParentState(1)}}>Join Team</Button>        </Grid>
        <Grid item xs={1} align="center">OR
        </Grid>
        <Grid item xs={4} align="center">
        <Button variant="contained" className="rightbutton" color="primary" onClick={()=>{this.props.changeParentState(2)}}>Create Team</Button>
        </Grid>
    </Grid>
    </Center>
      </div>
    );
  }
}
