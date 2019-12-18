import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField, FormControl, Grid, Select, Avatar, InputLabel, MenuItem } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

export default class Profile extends React.Component {
    classes = makeStyles();
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.state = {}
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    update = (event) => {
        console.log(this.state);
    }

    // inputLabel = React.useRef(null);
    render() {
        return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
            </Typography>
        <Grid container spacing ={3}>
            <Grid style={{padding:"1% 1% 1% 1%"}} container xs ={12} sm ={3}>
            <Avatar style={{width:"100%", height:"100%"}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={this.classes.large} />
            </Grid>
            <Grid style={{paddingTop:"2%"}}container spacing={3} xs={12} sm={9} >
              <Grid item xs={12} sm={4}>
              <TextField style ={{width:"100%"}}
              required
              id="outlined-required"
              name = "firstname"
              label="First Name"
              variant="outlined"
              onChange={this.handleChange}
            />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField style ={{width:"100%"}}
                  required
                  id="outlined-required"
                  name="middlename"
                  label="Middle name"
                  variant = "outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField style ={{width:"100%"}}
                  required
                  id="outlined-required"
                  name="lastname"
                  label="Last name"
                  variant = "outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField style={{ width: "100%"}}
                  required
                  id="outlined-full-width"
                  name="email"
                  label="Email"
                  fullwidth
                  variant = "outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm ={4}>
                <TextField style ={{width:"100%"}}
                   required
                   id="outlined-full-width"
                   name="phonenumber"
                   label="Phone Number"
                   defaultValue="+91 "
                   fullwidth
                   variant = "outlined"
                   onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm ={4} >
              <FormControl variant="outlined" style ={{ width:"100%"}} >
            <InputLabel required>
              Gender
            </InputLabel>
            <Select 
                name='gender'
                id='outlined-age-native-simple'
                onChange={this.handleChange}
              >
              <MenuItem value="" />
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
              </Grid>
             
               <Grid item xs={12} sm={4}>
             
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField style ={{width:"100%"}}
                  required
                  id="outlined-required"
                  name="rollno"
                  label="Roll No."
                  variant = "outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm ={3} >
              <FormControl variant="outlined" style ={{ width:"100%"}} >
            <InputLabel required>
              Year
            </InputLabel>
            <Select 
                name='year'
                id='outlined-year-native-simple'
                onChange={this.handleChange}
            >
              <MenuItem value="" />
              <MenuItem value={"First"}>First</MenuItem>
              <MenuItem value={"Second"}>Second</MenuItem>
              <MenuItem value={"Third"}>Third</MenuItem>
              <MenuItem value={"Fourth"}>Fourth</MenuItem>
            </Select>
          </FormControl>
              </Grid>
              <Grid item xs={12} sm ={3} >
              <FormControl variant="outlined" style ={{ width:"100%"}} >
            <InputLabel required>
              Department
            </InputLabel>
            <Select 
                name='department'
                id='outlined-year-native-simple'
                onChange={this.handleChange}
                >
              <MenuItem value="" />
              <MenuItem value={"Computers"}>Computers</MenuItem>
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
              <MenuItem value={"EXTC"}>EXTC</MenuItem>
              <MenuItem value={"ETRX"}>ETRX</MenuItem>
            </Select>
          </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField style ={{width:"100%"}}
                  required
                  id="outlined-required"
                  name="division"
                  label="Division"
                  variant = "outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
              <Button onClick={this.update}>Update</Button>
              </Grid>
            </Grid>
          </Grid>
          </React.Fragment>
        );
    }
}