import React, { Component } from "react";
import "../styles/searchbar.css";
import { CaretIcon } from "./CaretIcon";
import RRS from 'react-responsive-select';
import "react-responsive-select/dist/ReactResponsiveSelect.css";

import {
  Radio,
  FormControl,
  TextField,
  Select,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  InputLabel,
  MenuItem
} from "@material-ui/core/";

import Center from "react-center";
const radiostyle = {
  color: "#fff"
};

let orgs = [],
  ideas = [];
class SearchBar extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      software: true,
      hardware: true,
      searchfilter: "",
      org: "",
      ideabucket: ""
    };
    // console.log(this.props)
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let orgset = new Set();
    let ideaset = new Set();

    this.props.cards.forEach(obj => {
      orgset.add(obj.Company);
      ideaset.add(obj.Domain);
    });
    orgset = Array.from(orgset);
    ideaset = Array.from(ideaset);

    orgset.forEach(e => {
      orgs.push(<MenuItem value={e}>{e}</MenuItem>);
    });

    ideaset.forEach(e => {
      ideas.push(<MenuItem value={e}>{e}</MenuItem>);
    });
  }

  handleChange(event) {
    let { name, type, value, checked } = event.target;

    type != "checkbox"
      ? this.setState(
          {
            [name]: value
          },
          () => {
            this.props.filter(Object.assign({}, this.state));
          }
        )
      : this.setState(
          {
            [name]: checked
          },
          () => {
            this.props.filter(Object.assign({}, this.state));
          }
        );
  }


   onChange(newValue){console.log('onChange', newValue);}
   onSubmit(){console.log('onSubmit');}

  render() {
    return (
      <Grid style={{ backgroundColor: "#260B2C" }}>
        <Grid container item xs={9} spacing={3} style={{ margin: "auto" }}>
          <Grid container item xs={3} spacing={3}>
            <Grid item>
              <FormControlLabel
                value="software"
                control={
                  <Checkbox
                    color="primary"
                    style={radiostyle}
                    checked={this.state.software}
                    onChange={this.handleChange}
                  />
                }
                label="Software"
                name="software"
                style={{color:'white'}}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="hardware"
                control={
                  <Checkbox
                    color="primary"
                    style={radiostyle}
                    checked={this.state.hardware}
                    onChange={this.handleChange}
                  />
                }
                label="Hardware"
                name="hardware"
                style={{color:'white'}}
              />
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={3}>
            <Grid item style={{color:'white'}} >
              <Center style={{ height: '100%' }}>
                Filter by:
              </Center>
            </Grid>
            <Grid item xs={5}>
              <form>
                <RRS
                multiselect
                  name="Organization"
                  prefix="Organization: "
                  options={[
                    { text: 'All', value: 'null' },
                    { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
                    { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
                  ]}
                  selectedValue="All"
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  caretIcon={<CaretIcon />}
                  style={{width:'300px'}}
                />
              </form>
            </Grid>
            <Grid item style={{width:'max-content'}}>
              <form>
                <RRS
                multiselect
                name="Bucket"
                prefix="Bucket: "
                  options={[
                    { text: 'All', value: 'null' },
                    { text: 'Oldsmobile', value: 'oldsmobile', markup: <span>Oldsmobile</span> },
                    { text: 'Ford', value: 'ford', markup: <span>Ford</span> }
                  ]}
                  selectedValue="oldsmobile"
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  caretIcon={<CaretIcon />}
                  style={{width:'300px'}}
                />
              </form>
            </Grid>
          </Grid>
          <Grid container item xs={3} spacing={3}>
            <Grid item xs={12}>
            <TextField id="search" label="Search" variant="outlined" onChange={this.handleChange} name="searchfilter" value={this.state.searchfilter} style={{
                  background: 'white',  height: '100%', width: '100%', borderRadius:'5px'
                }}/>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    ); 
  }
}

export default SearchBar;
