import React from "react";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import Center from "react-center";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import {
    Radio,
    FormControl,
    TextField,
    Select,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Grid,
    MenuItem
} from "@material-ui/core/";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";

const radiostyle = {
    color: "#000"
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 350,
            backgroundColor: "white"
        }
    }
};

const customInputTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: { main: "#000000" },
        secondary: { main: "#00ff00" },
        error: { main: "#ff0000" }
    }
});

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.props = props;
        this.state = {
            reviewed: true,
            unreviewed: true,
            searchfilter: "",
            years: [],
            branches: [],
            anchorEl: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        

        

        this.yearset = ["First", "Second", "Third", "Fourth"]
        this.branchset = ["Comps", "IT", "ETRX", "EXTC", "MECH"]
        
    }

    handleClick(event) {
        console.log(this.state);
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        console.log(this.state);
        this.setState({ anchorEl: null });
    }

    handleChange(event) {
        let { name, type, value, checked } = event.target;
        console.log(event);
        type != "checkbox"
            ? this.setState(
                  {
                      [name]: value,
                      prevFilterApplied: false
                  },
                  () => {
                      this.props.filter(Object.assign({}, this.state));
                  }
              )
            : this.setState(
                  {
                      [name]: checked,
                      prevFilterApplied: false
                  },
                  () => {
                      this.props.filter(Object.assign({}, this.state));
                  }
              );
    }
    

    render() {
        

        let open = Boolean(this.state.anchorEl);
        let id = open ? "simple-popover" : undefined;
        let contentHuge = 
            <Paper style={{ padding: 8 }}>
                <Grid
                    container
                    style={{ flexGrow: 1 }}
                    direction="row"
                    justify="center"
                >
                    <Grid container item xs={12} md={4} justify="center">
                        <TextField
                            id="ps-search"
                            label="Search"
                            name="searchfilter"
                            style={{ width: "30vw", maxWidth: "400px" }}
                            onChange={this.handleChange}
                            value={this.state.searchfilter}
                        />
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        md={4}
                        justify="center"
                        align="center"
                        style={{ marginLeft: 10}}
                    >
                        <Grid item xs={12}>
                            <Center style={{ height: "100%" }}>
                                <Button
                                    aria-describedby={id}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                    variant="outlined"
                                    style={{ verticalAlign: "baseline" }}
                                >
                                    More Filters &nbsp;
                                    <FilterListIcon />
                                </Button>
                            </Center>
                                
                        </Grid>
                        
                    </Grid>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <Paper style={{ padding: "16px", width: 250 }}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                spacing={2}
                            >
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justify="center"
                                >
                                    <Grid item>
                                        <FormControlLabel
                                            value="reviewed"
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    style={radiostyle}
                                                    checked={
                                                        this.state.reviewed
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            }
                                            label="Reviewed"
                                            name="reviewed"
                                            
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            value="unreviewed"
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    style={radiostyle}
                                                    checked={
                                                        this.state.unreviewed
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            }
                                            label="Unreviewed"
                                            name="unreviewed"
                                            
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Popover>
                </Grid>
            </Paper>
        
        return this.props.loading? <Center><div>Loading...</div></Center> : contentHuge
    }
}