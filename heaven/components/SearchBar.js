import React, { Component } from 'react';
import '../styles/searchbar.css';
import {Radio, FormControl, TextField, Select, RadioGroup, FormControlLabel, Checkbox, Grid, InputLabel, MenuItem} from '@material-ui/core/';

import Center from 'react-center'
const radiostyle = {
  color: '#fff'
}


let orgs = [], ideas =[]
class SearchBar extends Component {
  constructor(props)
  {
    super();
    this.props = props;
    this.state = {
      software: true,
      hardware: true,
      searchfilter: "",
      org:"",
      ideabucket: "",


    }
    // console.log(this.props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount()
  {

    let orgset = new Set()
  let ideaset = new Set()
    
    this.props.cards.forEach(obj =>
      {
          orgset.add(
            obj.Company
            
            
          )
          ideaset.add(
            
            obj.Domain
            
            )
      })
      orgset = Array.from(orgset);
      ideaset = Array.from(ideaset);

      orgset.forEach(e=>
        {
          orgs.push(
            
            <MenuItem value={e}>{e}</MenuItem>
            
            )
        })

        ideaset.forEach(e=>
          {
            ideas.push(
              
              <MenuItem value={e}>{e}</MenuItem>
              
              )
          })
  }

  handleChange(event)
  {
    let {name, type, value, checked} = event.target
    
    type != "checkbox"? this.setState(
      {
        [name] : value
      }, ()=>
      {
        this.props.filter(Object.assign({}, this.state));
      }
    ): this.setState(
      {
        [name]: checked
      }, ()=>{
        this.props.filter(Object.assign({}, this.state));
      }
    )

    
  }

  render() {
    return (
      <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div>
        
        <div className="mainbar">
            <Grid container 
            direction="row" style={{
              padding: '20px 0'
            }}>
              <Grid item md={3} sm={12}> 
              <div className="beftext">
                
                
                
                  <FormControlLabel
                    value="software"
                    control={<Checkbox color="primary" style={radiostyle} checked = {this.state.software}  onChange={this.handleChange}/>}
                    label="Software"
                    name="software"
                  />
                  <FormControlLabel
                    value="hardware"
                    control={<Checkbox color="primary" style={radiostyle} checked = {this.state.hardware}  onChange={this.handleChange}/>}
                    label="Hardware"
                    name="hardware"
                  />
                
              </div>
            </Grid>
            <Grid item md={6} sm={12} container direction="row" >
             
                <Grid item sm={4}>
                <Center style={{height:'100%'}}>
                  <div className="filtertext">Filter by</div>
                </Center >
                  </Grid>
                  <Grid item sm={4}>
            <FormControl variant="outlined" className="firstlist" >
            <InputLabel id="demo-simple-select-outlined-label">
              Organisation
           </InputLabel>
            <Select style={{
              background: 'white'
            }} onChange={this.handleChange} name="org">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
                {orgs}
            </Select>
            </FormControl>
            </Grid>
            <Grid item sm={4}>
            <FormControl variant="outlined" className="secondlist" >
            <InputLabel id="demo-simple-select-outlined-label">
              Idea Bucket
           </InputLabel>
            <Select style={{
              background: 'white'
            }} onChange={this.handleChange} name="ideabucket">
                <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ideas}
            </Select>
            </FormControl>
            </Grid>
            </Grid>
            <Grid item md={3} sm={12}>
              <div style={
                {
                margin: 'auto'
                }
              }>
                <FormControl className="searchbox">
                <TextField id="filled-basic" label="Search" variant="filled" onChange={this.handleChange} name="searchfilter" value={this.state.searchfilter} style={{
                  background: 'white'
                }}/>
                </FormControl>
            </div>
            </Grid>
            
            </Grid>
        </div>
      </div>
      </div>
    );
  }
}

export default SearchBar;
