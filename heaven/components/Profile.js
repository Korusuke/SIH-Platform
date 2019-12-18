import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';

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
  

export default function Profile(){
    const classes = useStyles();
    const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
        </Typography>
    <Grid container spacing ={3}>
        <Grid style={{padding:"1% 1% 1% 1%"}} container xs ={12} sm ={3}>
        <Avatar style={{width:"100%", height:"100%"}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
        </Grid>
        <Grid style={{paddingTop:"2%"}}container spacing={3} xs={12} sm={9} >
          <Grid item xs={12} sm={4}>
          <TextField style ={{width:"100%"}}
          required
          id="outlined-required"
          name = "firstname"
          label="First Name"
          variant="outlined"
        />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField style ={{width:"100%"}}
              required
              id="outlined-required"
              name="middlename"
              label="Middle name"
              variant = "outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField style ={{width:"100%"}}
              required
              id="outlined-required"
              name="lastname"
              label="Last name"
              variant = "outlined"
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
            />
          </Grid>
          <Grid item xs={12} sm ={4} >
          <FormControl variant="outlined" style ={{ width:"100%"}} >
        <InputLabel ref={inputLabel} required variant = "outlined">
          Gender
        </InputLabel>
        <Select 
        
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
            />
          </Grid>
          <Grid item xs={12} sm ={3} >
          <FormControl variant="outlined" style ={{ width:"100%"}} >
        <InputLabel ref={inputLabel} required variant = "outlined">
          Year
        </InputLabel>
        <Select 
        
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
        <InputLabel ref={inputLabel} required variant = "outlined">
          Department
        </InputLabel>
        <Select 
        
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
            />
          </Grid>
        </Grid>
    </Grid>
      </React.Fragment>
    );
}
