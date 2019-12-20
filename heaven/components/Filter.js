import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import Center from 'react-center';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';

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
            backgroundColor: 'white'
        },
    },
};

export default class Filter extends React.Component{
    constructor(props)
    {
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

    }


    handleClick(event) {
        console.log(this.state);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        console.log(this.state);
        this.setState({anchorEl: null});
    };

    handleChange(event) {
        let { name, type, value, checked } = event.target;
        console.log(event)
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
    };

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
        let open = Boolean(this.state.anchorEl);
        let id = open ? 'simple-popover' : undefined;
        return (
            <Paper style={{padding:8}}>
                <Grid container style={{ flexGrow: 1, }} direction='row' justify='center'>
                    <Grid container item xs={12} md={4} justify='center'>
                        <TextField id="ps-search" label="Search" name="search" style={{width:'30vw',maxWidth:'400px'}}/>
                    </Grid>

                    <Grid container item xs={12} md={4} justify='center' align="center" style={{marginLeft:10}}>
                        <Grid item>
                            <Center style={{ height: '100%' }}>
                                <Button aria-describedby={id} aria-haspopup="true" onClick={this.handleClick} variant='outlined' style={{ verticalAlign: 'baseline'}}>
                                More Filters &nbsp;<FilterListIcon />
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
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}

                >
                    <Paper style={{padding:'16px',width:250}}>
                        <Grid container direction='column' justify='center' spacing={2}>
                            <Grid item container direction='row' justify='center'>
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
                                        style={{ color: 'black' }}
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
                                        style={{ color: 'black' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container direction='row' justify='center'>
                                <Grid item>
                                    <FormControl style={{
                                        minWidth: 170,
                                        maxWidth: 200,
                                        backgroundColor: 'white',
                                        borderRadius: '5px'
                                    }}>
                                        <InputLabel id="organization" >Organization</InputLabel>
                                        <Select
                                                labelId="organization"
                                                id="organization-mutiple-checkbox"
                                                multiple
                                                style = {{width:'100%'}}
                                                value={this.state.orgs}
                                                name='orgs'
                                                onChange={this.handleChange}
                                                input={<Input />}
                                                renderValue={selected => selected.join(', ')}
                                                MenuProps={MenuProps}
                                                variant="outlined"

                                        >
                                            {this.orgset.map(e => (
                                                <MenuItem key={e} value={e}>
                                                    <Checkbox
                                                        checked={this.state.orgs.indexOf(e) > -1} />
                                                    <ListItemText primary={e} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                </Grid>
                                <Grid item container direction='row' justify='center'>
                                    <Grid item>
                                        <FormControl style={{
                                            minWidth: 150,
                                            maxWidth: 200,
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
                                                {this.ideaset.map(e => (
                                                    <MenuItem key={e} value={e}>
                                                        <Checkbox
                                                            checked={this.state.ideas.indexOf(e) > -1} />
                                                        <ListItemText primary={e} />
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Popover>
                </Grid>
            </Paper>
        )
    }
}