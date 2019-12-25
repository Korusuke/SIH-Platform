import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
            software: true,
            hardware: true,
            searchfilter: "",
            orgs: [],
            ideas: [],
            anchorEl: null,
            labels:[]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        let orgset = new Set();
        let ideaset = new Set();

        this.props.cards.forEach(obj => {
            orgset.add(obj.Company);
            ideaset.add(obj.Domain);
        });

        this.orgset = Array.from(orgset);
        this.ideaset = Array.from(ideaset);
        this.labelset = [];
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

    // sideList = side => (
    //     <div
    //         className={this.classes.list}
    //         role="presentation"
    //         onClick={this.toggleDrawer(side, false)}
    //         onKeyDown={this.toggleDrawer(side, false)}
    //     >
    //         <List>
    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </div>
    // );

    render() {
        if (Object.keys(this.props.allLabels) && this.labelset.length == 0) {
            let labelSet = new Set();
            for (let i in this.props.allLabels) {
                console.log(i);
                this.props.allLabels[i].labels.forEach(e => {
                    labelSet.add(e.label);
                });
            }
            this.labelset = Array.from(labelSet);
        }

        let open = Boolean(this.state.anchorEl);
        let id = open ? "simple-popover" : undefined;
        return (
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
                        />
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        md={4}
                        justify="center"
                        align="center"
                        style={{ marginLeft: 10 }}
                    >
                        <Grid item>
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
                                            value="software"
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    style={radiostyle}
                                                    checked={
                                                        this.state.software
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            }
                                            label="Software"
                                            name="software"
                                            
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            value="hardware"
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    style={radiostyle}
                                                    checked={
                                                        this.state.hardware
                                                    }
                                                    onChange={this.handleChange}
                                                />
                                            }
                                            label="Hardware"
                                            name="hardware"
                                            
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justify="center"
                                >
                                    <Grid item>
                                        <FormControl
                                            style={{
                                                minWidth: 170,
                                                maxWidth: 200,
                                                // backgroundColor: "white",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            <MuiThemeProvider
                                                theme={customInputTheme}
                                            >
                                                <InputLabel id="organization">
                                                    Organization
                                                </InputLabel>
                                                <Select
                                                    labelId="organization"
                                                    id="organization-mutiple-checkbox"
                                                    multiple
                                                    style={{ width: "100%" }}
                                                    value={this.state.orgs}
                                                    name="orgs"
                                                    onChange={this.handleChange}
                                                    input={<Input />}
                                                    renderValue={selected =>
                                                        selected.join(", ")
                                                    }
                                                    MenuProps={MenuProps}
                                                    variant="outlined"
                                                >
                                                    {this.orgset.map(e => (
                                                        <MenuItem
                                                            key={e}
                                                            value={e}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    this.state.orgs.indexOf(
                                                                        e
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={e}
                                                            />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </MuiThemeProvider>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justify="center"
                                >
                                    <Grid item>
                                        <FormControl
                                            style={{
                                                minWidth: 150,
                                                maxWidth: 200,
                                                // backgroundColor: "white",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            <MuiThemeProvider
                                                theme={customInputTheme}
                                            >
                                                <InputLabel id="ideas">
                                                    ideas
                                                </InputLabel>
                                                <Select
                                                    labelId="ideas"
                                                    id="ideas-mutiple-checkbox"
                                                    multiple
                                                    value={this.state.ideas}
                                                    name="ideas"
                                                    onChange={this.handleChange}
                                                    input={<Input />}
                                                    renderValue={selected =>
                                                        selected.join(", ")
                                                    }
                                                    MenuProps={MenuProps}
                                                    variant="outlined"
                                                >
                                                    {this.ideaset.map(e => (
                                                        <MenuItem
                                                            key={e}
                                                            value={e}
                                                        >
                                                            <Checkbox
                                                                checked={
                                                                    this.state.ideas.indexOf(
                                                                        e
                                                                    ) > -1
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={e}
                                                            />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </MuiThemeProvider>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {this.labelset.length > 0 ? (
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justify="center"
                                    >
                                        <Grid item>
                                            <FormControl
                                                style={{
                                                    minWidth: 150,
                                                    maxWidth: 200,
                                                    // backgroundColor: "white",
                                                    borderRadius: "5px"
                                                }}
                                            >
                                                <MuiThemeProvider
                                                    theme={customInputTheme}
                                                >
                                                    <InputLabel id="labels">
                                                        Labels
                                                    </InputLabel>
                                                    <Select
                                                        labelId="labels"
                                                        id="labels-mutiple-checkbox"
                                                        multiple
                                                        value={this.state.labels}
                                                        name="labels"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        input={<Input />}
                                                        renderValue={selected =>
                                                            selected.join(", ")
                                                        }
                                                        MenuProps={MenuProps}
                                                        variant="outlined"
                                                    >
                                                        {this.labelset.map(
                                                            e => (
                                                                <MenuItem
                                                                    key={e}
                                                                    value={e}
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            this.state.labels.indexOf(
                                                                                e
                                                                            ) >
                                                                            -1
                                                                        }
                                                                    />
                                                                    <ListItemText
                                                                        primary={
                                                                            e
                                                                        }
                                                                    />
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </MuiThemeProvider>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </Paper>
                    </Popover>
                </Grid>
            </Paper>
        );
    }
}
