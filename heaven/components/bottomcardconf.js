import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/bottomcard.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Center from 'react-center';
import Card from '@material-ui/core/Card';
import ReactDOM from 'react-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Snackbar from './snackbar';

class App extends Component {

  constructor(props)
  {
    super()
    this.props = props
    this.state = {
      snack: false,
    }

    this.exitTeam = this.exitTeam.bind(this);
    this.handleCopy = this.handleCopy.bind(this)
  }

  snackcontent = ''
  handleCopy() {
    this.snackcontent = <Snackbar type='success' msg='Copied to Clipboard' />;
    this.setState({ snack: true });
    setTimeout(() => {
      this.setState({ snack: false });
    }, 3000);
  }

  exitTeam()
  {
    try{
      fetch(`${this.props.url}/team/exit/`, {
          method: "POST",
          credentials: "include",


      }).then(res => res.json())
      .then(data => {
          if (data.status == "success")
              this.props.changeParentState(0, data);
          else this.props.changeParentState(-1, data);
      });
  }
  catch(e)
  {
      console.log(e)
      data = {
          status: 'error',
          msg: 'Something went wrong :('
      }
      this.props.changeParentState(-1, data);
  }
  }

  render() {
    let arr = []
    this.props.team.members.forEach(e=>{

      arr.push(
        <Grid item xs={10}>
            <Paper style={{margin: '20px'}}>
                <Grid container direction="row" justify="center"
                    alignItems="center" spacing={2}>
                    {/* <Grid item md={3} style={{fontSize: '20px'}}>{member.name}</Grid> */}
                    <Grid item md={7} style={{fontSize: '20px'}}>{e}</Grid>
                    {/* <Grid item md={2}>{role}</Grid> */}
                </Grid>
            </Paper>
            {/* <div style={{minHeight:'50px', borderBottom:'1px solid black'}} ><span className="emailmember">{e}</span><span className="rightags"></span></div> */}
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
          defaultValue={this.props.team.teamName}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
          </Grid>
                {this.state.snack ? this.snackcontent : null}
                <Grid item xs={10}>
                  <CopyToClipboard onCopy={this.handleCopy}
                    text={this.props.team.inviteCode} >
                    <ButtonBase >

                    <TextField
                    id="outlined-read-only-input"
                    label="Team Code"
                        defaultValue={this.props.team.inviteCode}
                        InputProps={{
                          readOnly: true,
                          endAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={faCopy} width="18" style={{ color: '#a05a07' }} /></InputAdornment>,
                        }}
                        variant="outlined"
                      />
                    </ButtonBase>
                  </CopyToClipboard>
          </Grid>

          {/* <Grid item xs={10}>
          <Button style={{width:"100%"}} variant="contained" color="primary">Add member</Button>
          </Grid> */}
        <Grid item xs={1}>
        </Grid>
          <Grid item xs={10}>
          <Button style={{width:"100%"}} variant="contained" color="secondary" onClick={this.exitTeam}>Exit team</Button>
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
