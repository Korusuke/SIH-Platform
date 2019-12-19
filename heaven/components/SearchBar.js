import React, { Component } from "react";
import "../styles/searchbar.css";
import {
  Radio,
  FormControl,
  TextField,
  Select,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  MenuItem,
} from "@material-ui/core/";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';


import Center from "react-center";
const radiostyle = {
  color: "#fff"
};

const customTheme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#000' }
  }
});


class SearchBar extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      software: true,
      hardware: true,
      searchfilter: "",
      orgs: [],
      ideas: [],
    };
    // console.log(this.props)
    this.handleChange = this.handleChange.bind(this);

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

  render() {

    let orgset = new Set();
    let ideaset = new Set();
    let orgs = [],
      ideas = [];
    this.props.cards.forEach(obj => {
      orgset.add(obj.Company);
      ideaset.add(obj.Domain);
    });

    orgset = Array.from(orgset);
    ideaset = Array.from(ideaset);

    orgset.forEach(e => {
      orgs.push(<MenuItem key={e} value={e}>
        <Checkbox
          checked={this.state.orgs.indexOf(e) > -1} />
        <ListItemText primary={e} />
      </MenuItem>);
    });



    ideaset.forEach(e => {
      ideas.push(<MenuItem key={e} value={e}>
        <Checkbox
          checked={this.state.ideas.indexOf(e) > -1} />
        <ListItemText primary={e} />
      </MenuItem>);
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 350,
          backgroundColor:'white'
        },
      },
    };
    console.log(orgs);
    return (
      <Grid style={{ backgroundColor: "#260B2C" }}>
        <Grid container item xl={9} md={11} spacing={3} style={{ margin: "auto" }}>

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


            <Grid item style={{color:'white'}} >
              <Center style={{ height: '100%' }}>
                Filter by:
              </Center>
            </Grid>
            <Grid item xs={5}>
            <FormControl style={{
              minWidth: 120,
              maxWidth: 300,
              backgroundColor: 'white',
              borderRadius:'5px'}}>
              <InputLabel id="organization" >Organization</InputLabel>
              <Select
                labelId="organization"
                id="organization-mutiple-checkbox"
                multiple
                value={this.state.orgs}
                name='orgs'
                onChange={this.handleChange}
                input={<Input />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                variant="outlined"
              >
                {orgs}
              </Select>
            </FormControl>
            </Grid>
            <Grid item style={{width:'max-content'}}>
            <FormControl style={{
              minWidth: 120,
              maxWidth: 300,
              backgroundColor: 'white',
              borderRadius: '5px'
            }}>
              <InputLabel id="ideas" >ideas</InputLabel>
              <Select
                labelId="ideas"
                id="ideas-mutiple-checkbox"
                multiple
                value={this.state.ideas}
                name='ideas'
                onChange={this.handleChange}
                input={<Input />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                variant="outlined"
              >
                {ideas}
              </Select>
            </FormControl>
            </Grid>


          <Grid item xs={3}>
            <Center style={{ height: '100%' }}>
              <MuiThemeProvider theme={customTheme}>
                <TextField id="search" label="Search" variant="filled"
                  onChange={this.handleChange}
                  name="searchfilter"
                  value={this.state.searchfilter}
                  style={{
                    borderRadius: '5px',
                    backgroundColor:'white',
                    }} />
              </MuiThemeProvider>
            </Center>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SearchBar;
