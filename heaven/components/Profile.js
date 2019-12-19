import React, { Component } from 'react';
import { Button, Typography, TextField, FormControl, Grid, Select, Avatar, InputLabel, MenuItem } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import InputAdornment from '@material-ui/core/InputAdornment';



class Profile extends React.Component{
    
  getJustify(){
    if (isWidthUp('lg', this.props.width)) {
      return 'left';
    }
  
    if (isWidthUp('md', this.props.width)) {
      return 'center';
    }
  
    return 'center';
  }

  constructor(props)
  {
    super()
    this.props = props
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      firstname:"",
      middlename:"",
      lastname:"",
      email:"",
      phonenumber:"",
      gender:"",
      division:"",
      department:"",
      year:"",
      rollno:""
    }
  }

    handleChange(event)
    {
      let {name, type, value} = event.target
      console.log(event.target)
      this.setState(
        {
          [name]:value
        }
      )

      console.log(name+": "+value)
    }

    render(){
     // const inputLabel = React.useRef(null);
    return (
          <Grid justify={this.getJustify()} container spacing ={3}>
        <Grid justify={this.getJustify()} style={{padding:"1% 1% 1% 1%"}} item xs ={8} sm ={3}>
          <div style={{width:"100%",position:"relative",}}>
            <Avatar style={{width:"100%", height:"100%"}} 
                    alt="Remy Sharp" 
                    src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png"  />
          </div>
        </Grid>
        <Grid justify={this.getJustify()} style={{paddingTop:"2%"}} container item spacing={3} xs={12} sm={9} >
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
                <TextField fullWidth='true'
                required
                id="outlined-required"
                name = "firstname"
                label="First Name"
                variant="outlined"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
              <TextField fullWidth='true'
                required
                id="outlined-required"
                name="middlename"
                label="Middle name"
                variant = "outlined"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
              <TextField fullWidth='true'
                required
                id="outlined-required"
                name="lastname"
                label="Last name"
                variant = "outlined"
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} md={8}>
              <TextField fullWidth='true'
                required
                id="outlined-full-width"
                name="email"
                label="Email"
                fullwidth="true"
                variant = "outlined"
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} sm ={8} lg={4}>
              <TextField fullWidth='true'
                required
                id="outlined-full-width"
                name="phonenumber"
                label="Phone Number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
                fullwidth="true"
                variant = "outlined"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid justify={this.getJustify()} item xs={12} sm ={4} lg={4}>

              <TextField 
              fullWidth='true'
              id="gender-select"
              select
              label="Gender"
              name="gender"
              onChange={this.handleChange}
              variant="outlined">
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Other"}>Other</option>
              </TextField>
              
            </Grid>
          </Grid>
          
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
          <Grid justify={this.getJustify()} item xs={12} sm={6} md={4}>
            <TextField fullWidth='true'
              required
              id="outlined-required"
              name="rollno"
              label="Roll No."
              variant = "outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid justify={this.getJustify()} item xs={12} sm ={6} md={3}>
            <TextField 
              fullWidth='true'
              id="year-select"
              select
              label="Year"
              name="year" 
              onChange={this.handleChange}
              variant="outlined">
              <option value={"First"}>First</option>
              <option value={"Second"}>Second</option>
              <option value={"Third"}>Third</option>
              <option value={"Fourth"}>Fourth</option>
            </TextField>

          </Grid>
          <Grid justify={this.getJustify()} item xs={12} sm ={8} md={3}>
          
            <TextField 
              fullWidth='true'
              id="dept-select"
              select
              label="Department"
              name="department" 
              onChange={this.handleChange}
              variant="outlined">
                <option value={"Computers"}>Computers</option>
                <option value={"IT"}>IT</option>
                <option value={"Mechanical"}>Mechanical</option>
                <option value={"EXTC"}>EXTC</option>
                <option value={"ETRX"}>ETRX</option>
            </TextField>

          </Grid>
          <Grid justify={this.getJustify()} item xs={12} sm={4} md={2}>
            <TextField 
            fullWidth='true'
              required
              id="outlined-required"
              name="division"
              label="Division"
              variant = "outlined"
              onChange={this.handleChange}
            />
              </Grid>
              </Grid>



              <Grid justify={this.getJustify()} item xs={6} sm={2}>
              <Button onClick={this.update}>Update</Button>
              </Grid>
            </Grid>
          </Grid>
          
      );
    }
}

export default withWidth()(Profile)
