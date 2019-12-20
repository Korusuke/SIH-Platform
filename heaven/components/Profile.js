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
    this.update = this.update.bind(this)

    this.state = {
      user:{
        firstName:"",
        middleName:"",
        lastName:"",
        phone:"",
        gender:"",
        division:"",
        department:"",
        year:"",
        rollNo:"",
        email:""
      },
      updating: false
    }
  }

    handleChange(event)
    {
      let {name, type, value} = event.target
      console.log(event.target)
      if(this.state.user.hasOwnProperty(name))
      {
        this.setState((prevState)=>{
          console.log('setting')
          let user = Object.assign({}, prevState.user)
          user[name] = value
          console.log(user)
          return ({
            user: user
          })
        }, () => {
          console.log('ns', this.state);
      })
          
      }
      else{
        this.setState(
          {
            [name]:value
          }
        )
      }

      console.log(name+": "+value)
    }

    componentDidMount()
    {
      fetch('http://localhost:8080/user/', {
                
                credentials: "include",
                
          }).then(res=>res.json()).then(data=>{
            console.log(data)

            let user = {}
            for(let key in data.data)
            {
              console.log(key)
              if(this.state.user.hasOwnProperty(key) && this.state.user[key] !== data.data[key])
              {
                  user[key]= data.data[key]
              }
            }
            console.log(user)
            
            this.setState(
              {
                user: user
              })
          })
    }

      update()
      {
        this.setState(
          {
            updating: true
          }
        )

        try{
          fetch('http://localhost:8080/user/', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.user)
          }).then(res=>res.json()).then(data=>{
            console.log(data)

            this.setState(
              {
                updating: false
              }
            )
            
          })
        }catch(e)
        {
          console.log(e)
          this.setState({
            updating: false
          })
        }
      }
    render(){
     // const inputLabel = React.useRef(null);
    return (
          <Grid justify={this.getJustify()} container spacing ={3}>
        <Grid justify={this.getJustify()} style={{padding:"1% 1% 1% 1%"}} item xs ={8} sm ={3}>
          <div style={{width:"100%",position:"relative",}}>
            <Avatar className="profilePagePhoto" style={{width:"100%", height:"100%" }} 
                    
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"  />
          </div>
        </Grid>
        <Grid justify={this.getJustify()} style={{paddingTop:"2%"}} container item spacing={3} xs={12} sm={9} >
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
                <TextField fullWidth='true'
                required
                id="outlined-required"
                name = "firstName"
                label="First Name"
                variant="outlined"
                value={this.state.user.firstName}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
              <TextField fullWidth='true'
                required
                
                id="outlined-required"
                name="middleName"
                label="Middle name"
                variant = "outlined"
                value={this.state.user.middleName}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid justify={this.getJustify()} item xs={12} md={4}>
              <TextField fullWidth='true'
                required
                id="outlined-required"
                name="lastName"
                label="Last name"
                variant = "outlined"
                value={this.state.user.lastName}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} md={8}>
              <TextField fullWidth='true'
                required
                id="outlined-full-width"
                label="Email"
                fullwidth="true"
                variant = "outlined"
                disabled="true"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid justify={this.getJustify()} container item xs={12} spacing={3} direction='coloumn'>
            <Grid justify={this.getJustify()} item xs={12} sm ={8} lg={4}>
              <TextField fullWidth='true'
                required
                id="outlined-full-width"
                name="phone"
                label="Phone Number"
                value={this.state.user.phone}
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
              value={this.state.user.gender}
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
              name="rollNo"
              value={this.state.user.rollNo}
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
              value={this.state.user.year}
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
              value={this.state.user.department}
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
              value={this.state.user.division}
              variant = "outlined"
              onChange={this.handleChange}
            />
              </Grid>
              </Grid>



              <Grid justify={this.getJustify()} item xs={6} sm={2}>
              <Button variant="contained" onClick={this.update} disabled={this.state.updating}>{this.state.updating? 'Updating..': 'Update'}</Button>
              </Grid>
            </Grid>
          </Grid>
          
      );
    }
}

export default withWidth()(Profile)
