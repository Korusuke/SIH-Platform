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


export default class Profile extends React.Component{
    
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

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
      this.setState(
        {
          [name]:value
        }
      )

      console.log(name+": "+value)
    }

    render(){
      //const classes = useStyles();
     // const inputLabel = React.useRef(null);
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
        </Typography>
    <Grid container spacing ={3}>
        <Grid style={{padding:"1% 1% 1% 1%"}} item xs ={12} sm ={3}>
        <Avatar style={{width:"15vw", height:"15vw", position:"relative", left: "50%", top:'50%', transform:'translate(-50%, -50%'}} alt="Remy Sharp" src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png"  />
        </Grid>
        <Grid style={{paddingTop:"2%"}}container item spacing={3} xs={12} sm={9} >
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
              fullwidth="true"
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
               fullwidth="true"
               variant = "outlined"
               onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm ={4} >
          <FormControl variant="outlined" style ={{ width:"100%"}} >
        <InputLabel ref={null} required variant = "outlined">
          Gender
        </InputLabel>
        <Select 
        onChange={this.handleChange}
        inputProps={{
            name: 'gender',
            id: 'outlined-age-native-simple',
          }}>
          <option value="" />
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Other"}>Other</option>
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
        <InputLabel ref={null} required variant = "outlined">
          Year
        </InputLabel>
        <Select 
        onChange={this.handleChange}
        inputProps={{
            name: 'year',
            id: 'outlined-year-native-simple',
          }}>
          <option value="" />
          <option value={"First"}>First</option>
          <option value={"Second"}>Second</option>
          <option value={"Third"}>Third</option>
          <option value={"Fourth"}>Fourth</option>
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12} sm ={3} >
          <FormControl variant="outlined" style ={{ width:"100%"}} >
        <InputLabel ref={null} required variant = "outlined">
          Department
        </InputLabel>
        <Select 
        onChange={this.handleChange}
        inputProps={{
            name: 'department',
            id: 'outlined-year-native-simple',
          }}>
          <option value="" />
          <option value={"Computers"}>Computers</option>
          <option value={"IT"}>IT</option>
          <option value={"Mechanical"}>Mechanical</option>
          <option value={"EXTC"}>EXTC</option>
          <option value={"ETRX"}>ETRX</option>
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