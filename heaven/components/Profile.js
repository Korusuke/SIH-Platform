import React, { Component } from "react";
import {
    Button,
    Typography,
    TextField,
    FormControl,
    Grid,
    Select,
    Avatar,
    InputLabel,
    MenuItem
} from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Input from '@material-ui/core/Input';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core/";
import ListItemText from '@material-ui/core/ListItemText';



import envvar from '../env'

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

class Profile extends React.Component {
    getJustify() {
        if (isWidthUp("lg", this.props.width)) {
            return "left";
        }

        if (isWidthUp("md", this.props.width)) {
            return "center";
        }

        return "center";
    }

    constructor(props) {
        super();
        this.props = props;
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.state = {
            user: {
                firstName: "",
                middleName: "",
                lastName: "",
                phone: "",
                gender: "",
                division: "",
                department: "",
                year: "",
                rollNo: "",
                email: "",
                profilePic: ""
            },
            updating: false,
            profilePicFile: null
        };
    }

    handleChange(event) {
        let { name, type, value } = event.target;
        //console.log('STATE', this.state)
        //console.log(event.target, this.state);
        if (this.state.user.hasOwnProperty(name)) {
            this.setState(
                prevState => {
                    //console.log("setting");
                    let user = Object.assign({}, prevState.user);
                    user[name] = value;
                    // console.log(user);
                    return {
                        user: user
                    };
                }
            );
        } else {
            this.setState({
                [name]: value
            });
        }

        // console.log(name + ": " + value);
    }

    componentDidMount() {
        fetch(`${envvar.REACT_APP_SERVER_URL}/user/`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                //console.log('DATA', data);

                //console.log(this.state.user)

                let user = Object.assign({}, this.state.user)
                for (let key in data.data) {
                    // console.log(key);
                    if (
                        this.state.user.hasOwnProperty(key)
                    ) {
                        user[key] = data.data[key];
                    }
                }
                console.log(user);

                this.setState({
                    user: user
                }, ()=>{
                    if(user.firstName && user.lastName && user.middleName && user.phone && user.rollNo)
                    this.props.changeParentState(
                        {
                            allowTeam: true
                        }
                    )
                });


            });
    }

    update() {
        console.log('hello');
        this.setState({
            updating: true
        });

        try {
            console.log(this.state.user)
            const fdata = new FormData();
            Object.keys(this.state.user).forEach((key, index) => {
                if (key != "profilePic")
                    fdata.append(key, this.state.user[key]);
            });
            if (this.state.profilePicFile) {
                fdata.append("profilePic", this.state.profilePicFile);
            }

            console.log(fdata.get("email"));

            fetch(`${envvar.REACT_APP_SERVER_URL}/user/`, {
                method: "POST",
                credentials: "include",
                body: fdata
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    this.setState({
                        updating: false
                    }, ()=>{
                        if(this.state.user.firstName && this.state.user.lastName && this.state.user.middleName && this.state.user.phone && this.state.user.rollNo)
                        this.props.changeParentState(
                            {
                                allowTeam: true
                            }
                        )
                    });
                });
        } catch (e) {
            console.log(e);
            this.setState({
                updating: false
            });
        }
    }

    handlePhotoClick() {
        this.refs.fileUploader.click();
    }

    handleFileChange(event1) {
        const toBase64 = file =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

        let myfile = event1.target.files[0];

        toBase64(event1.target.files[0])
            .then(bs64 => {
                this.setState(
                    prevState => {
                        let user = Object.assign({}, prevState.user);
                        user.profilePic = bs64;
                        console.log(myfile);
                        return {
                            user: user,
                            profilePicFile: myfile
                        };
                    },
                    () => {
                        console.log("ns", this.state);
                    }
                );
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {

        console.log('PROCESS', process.env)
        // const inputLabel = React.useRef(null);
        let profileImg = this.state.user.profilePic
            ? this.state.user.profilePic[0] == "/"
                ? `${envvar.REACT_APP_SERVER_URL}${this.state.user.profilePic}`
                : this.state.user.profilePic
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        // console.log(profileImg);
        return (
            <Grid justify={this.getJustify()} container spacing={3}>
                <Grid
                    // justify={this.getJustify()}
                    style={{ padding: "1% 1% 1% 1%" }}
                    item
                    xs={8}
                    sm={3}
                >

                    <div style={{overflow:'hidden', borderRadius:'50%',
                    width: '100%', paddingTop: '100%',
                    position: 'relative', background: 'grey'}}
                    onClick={this.handlePhotoClick} className="profilePagePhoto">
                                <img style={{width:'100%', height: 'auto',
                                        position: 'absolute', top: 0, left: 0}} src={profileImg}></img>

                        <input
                            type="file"
                            id="file"
                            ref="fileUploader"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={this.handleFileChange}
                        />
                    </div>
                </Grid>
                <Grid
                    justify={this.getJustify()}
                    style={{ paddingTop: "2%" }}
                    container
                    item
                    spacing={3}
                    xs={12}
                    sm={9}
                >
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.update}
                        onError={errors => console.log(errors)}
                        style={{ width: '100%' }}
                    >
                    <Grid
                        justify={this.getJustify()}
                        container
                        item
                        xs={12}
                        spacing={3}
                        direction="row"
                    >
                        <Grid
                        // justify={this.getJustify()}
                        item xs={12} md={4}>
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                value={this.state.user.firstName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid
                        // justify={this.getJustify()}
                        item xs={12} md={4}>
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required"
                                name="middleName"
                                label="Middle name"
                                variant="outlined"
                                value={this.state.user.middleName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid
                        // justify={this.getJustify()}
                        item xs={12} md={4}>
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required"
                                name="lastName"
                                label="Last name"
                                variant="outlined"
                                value={this.state.user.lastName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        justify={this.getJustify()}
                        container
                        item
                        xs={12}
                        spacing={3}
                        direction="row"
                    >
                        <Grid
                        // justify={this.getJustify()}
                        item xs={12} md={8}>
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-full-width"
                                label="Email"
                                fullWidth={true}
                                variant="outlined"
                                disabled={true}
                                value={this.state.user.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        justify={this.getJustify()}
                        container
                        item
                        xs={12}
                        spacing={3}
                        direction="row"
                    >
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={8}
                            lg={4}
                        >
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-full-width"
                                name="phone"
                                label="Phone Number"
                                value={this.state.user.phone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            +91
                                        </InputAdornment>
                                    )
                                }}
                                fullWidth={true}
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={4}
                            lg={4}
                        >
                            <FormControl
                                variant="outlined"
                                style={{
                                    minWidth:200
                                }}
                            >

                                <InputLabel id="gender" >Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    label="Gender"
                                    name="gender"
                                    value={this.state.user.gender}
                                    onChange={this.handleChange}
                                    autoWidth

                                >

                                    <MenuItem key='Male' value='Male'>
                                            Male
                                    </MenuItem>
                                    <MenuItem key='Female' value='Female'>
                                            Female
                                    </MenuItem>
                                    <MenuItem key='Prefer Not to Answer' value='Prefer Not to Answer'>
                                        Prefer Not to Answer
                                    </MenuItem>


                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid
                        justify={this.getJustify()}
                        container
                        item
                        xs={12}
                        spacing={3}
                        direction="row"
                    >
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required"
                                name="rollNo"
                                value={this.state.user.rollNo}
                                label="Roll No."
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={6}
                            md={3}
                        >
                            <FormControl
                                variant="outlined"
                                style={{
                                    minWidth: 200
                                }}
                            >

                                <InputLabel id="year-select" >Year</InputLabel>
                                <Select
                                    labelId="year-select"
                                    label="Year"
                                    name="year"
                                    value={this.state.user.year}
                                    onChange={this.handleChange}
                                    autoWidth

                                >

                                    <MenuItem key='First' value='First'>
                                        First
                                    </MenuItem>
                                    <MenuItem key='Second' value='Second'>
                                        Second
                                    </MenuItem>
                                    <MenuItem key='Third' value='Third'>
                                        Third
                                    </MenuItem>
                                    <MenuItem key='Fourth' value='Fourth'>
                                        Fourth
                                    </MenuItem>



                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={8}
                            md={3}
                        >
                            <FormControl
                                variant="outlined"
                                style={{
                                    minWidth: 200
                                }}
                            >

                                <InputLabel id="department-select" >Department</InputLabel>
                                <Select
                                    labelId="department-select"
                                    label="Department"
                                    name="department"
                                    value={this.state.user.department}
                                    onChange={this.handleChange}
                                    autoWidth

                                >

                                    {['Comps','IT','ETRX','EXTC','MECH'].map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            // justify={this.getJustify()}
                            item
                            xs={12}
                            sm={4}
                            md={2}
                        >
                            <TextField
                                fullWidth={true}
                                required
                                id="outlined-required"
                                name="division"
                                label="Division"
                                value={this.state.user.division}
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                    // justify={this.getJustify()}
                    item xs={6} sm={2}>
                        <br/>
                        <Button
                            variant="contained"
                            // onClick={this.update}
                            type="submit"
                            disabled={this.state.updating}
                        >
                            {this.state.updating ? "Updating.." : "Update"}
                        </Button>
                        </Grid>
                    </ValidatorForm>
                </Grid>

            </Grid>
        );
    }
}

export default withWidth()(Profile);
