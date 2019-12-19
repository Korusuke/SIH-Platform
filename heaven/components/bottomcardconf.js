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

  constructor(props)
  {
    super()
    this.props = props
    this.state = {

    }
  }

  render() {
    let arr = []
    this.props.team.Members.forEach(e=>{
      
      arr.push(
        <Grid item xs={10}>
            <div style={{minHeight:'50px', borderBottom:'1px solid black'}} ><span className="emailmember">{e}</span><span className="rightags"></span></div>
        </Grid>
      )
    })
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

      <Grid item md={5}>
        <Grid container 
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}>

          <Grid item xs={10}>
          <TextField
          id="outlined-read-only-input"
          label="Team Name"
          defaultValue={this.props.team.TeamName}
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
          defaultValue={this.props.team.InviteCode}
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
      
      <Grid item md={7}>
        <Grid container 
        direction="column"
        spacing={3}>
          {arr}
        </Grid>
        </Grid>
        
      </Grid>
      </Center>
      </div>
    );
  }
}

export default App;
