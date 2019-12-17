import React, { Component } from 'react';
import './searchbar.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


class searchbar extends Component {


  render() {
    return (
      <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App">
        <br></br>
        <br></br>
        <div className="mainbar">
            <div className="beftext">
                <Radio></Radio>
                Software
                <Radio></Radio>
                Hardware
            </div>
            <div className="filtertext">Filter by</div>
            <FormControl variant="outlined" className="firstlist">
            <Select>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </Select>
            </FormControl>
            <FormControl variant="outlined" className="secondlist">
            <Select>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </Select>
            </FormControl>
            <FormControl className="searchbox">
            <TextField id="filled-basic" label="Search" variant="filled" />
            </FormControl>
        </div>
      </div>
      </div>
    );
  }
}

export default searchbar;
