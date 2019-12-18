import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, Card, TextField, Button} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Center from 'react-center';
import axios from 'axios';
import Snackbar from './snackbar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const customTheme = createMuiTheme({
    palette: {
        primary: { main: '#ffffff' },
        secondary: { main: '#000000' }
    }
});

const divStyle = {
    width: '540px',
};

const customInputTheme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
        secondary: { main: '#00ff00' },
        error: { main: '#ff0000' }
    }
});

const customOTPTheme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
        secondary: { main: '#000000' },
        error: { main: '#ff0000' }
    }
});

export default class LoginBox extends React.Component{
    state = {
        value: 0,
        login: {
            loginData: {
                email: '',
                password: '',
            }
        },
        signup: {
            SignUpData: {
                email: '',
                password: '',
                confirmpassword: '',
                otp: '',
            },
        },
        loginSubmitted: false,
        signupSubmitted: false,
        verifyOTP: false

    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleLogin = (event) => {
        const { loginData } = this.state.login;
        loginData[event.target.name] = event.target.value;
        this.setState({ loginData });
    }

    handleSignup = (event) => {
        const { SignUpData } = this.state.signup;
        SignUpData[event.target.name] = event.target.value;
        this.setState({ SignUpData });
    }

    handleOTP = (event) => {
        const { SignUpData } = this.state.signup;
        SignUpData[event.target.name] = event.target.value;
        this.setState({ SignUpData });
    }

    handleSignUpSubmit = () => {
        const { SignUpData } = this.state.signup;
        this.setState({ signupSubmitted: true }, () => {
            axios.post('http://295d5620.ngrok.io/signup', SignUpData).then(
                res => console.log(res.data)
            );
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    handleLoginSubmit = () => {
        const { loginData } = this.state.login;
        axios.post('http://295d5620.ngrok.io/login', loginData).then(
            res => {
                if (res.json.value === 'false') {
                    <Snackbar type='error' msg={res.json.msg} />
                } else {
                    console.log('Logged In');
                    //Page Redirect
                    }
                }
        );
            // <Snackbar type='success' msg='{status.msg}' />
    }

    handleOTPVerify = () => {
        const { SignUpData } = this.state.signup;
        axios.post('http://295d5620.ngrok.io/verify', SignUpData).then(
                res => console.log(res.data)
        ).then(
            res => {
                if (res.json.verified === 'true') {
                    this.setState({ verifyOTP: 'true' });
                }//else give toast and maybe send a new otp?
            }
        )

    }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { SignUpData } = this.state.signup;
            if (value !== SignUpData.password) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isEmailSomaiya', (value) => {
            if (value.slice(-11) !== 'somaiya.edu') {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isMinLength', (value) => {
            if (value.length < 8) {
                return false;
            }
            return true;
        });
    }

    render() {
        const { loginData } = this.state.login;
        const { SignUpData } = this.state.signup;
        const { loginSubmitted } = this.state;
        const { signupSubmitted } = this.state;
        const { verifyOTP } = this.state;
        let signupPanel;
        if (signupSubmitted) {
            signupPanel =
                <MuiThemeProvider theme={customInputTheme}>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleOTPVerify}
                    onError={errors => console.log(errors)}
                    style={{ width: '100%' }}
                >
                    <Center>
                        <TextValidator
                            id="OTP"
                            label="OTP"
                            onChange={this.handleOTP}
                            name="email"
                            value={SignUpData.otp}
                            variant="outlined"
                            required />
                    </Center>
                    <br />
                    <Center>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            disabled={verifyOTP}
                        >
                            {
                                (verifyOTP && 'Verifying OTP')
                                || (!verifyOTP && 'Verify')
                            }
                        </Button>
                    </Center>
                </ValidatorForm>
                </MuiThemeProvider>
        } else {
            signupPanel = <MuiThemeProvider theme={customInputTheme}>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSignUpSubmit}
                    onError={errors => console.log(errors)}
                    style={{ width: '100%' }}
                >
                    <Center>
                        <TextValidator
                            label="Email"
                            onChange={this.handleSignup}
                            name="email"
                            value={SignUpData.email}
                            validators={['required', 'isEmail', 'isEmailSomaiya']}
                            errorMessages={['Email Dena Padega Bro/Sis', 'Aeee Mail Daal', 'Aeee Bro Somaiya Wala']}
                            variant="outlined"
                            required

                            style={{ width: '80%' }}
                        />
                    </Center>
                    <br />
                    <Center>
                        <TextValidator
                            label="Password"
                            onChange={this.handleSignup}
                            name="password"
                            type="password"
                            value={SignUpData.password}
                            validators={['required', 'isMinLength']}
                            errorMessages={['This Field is required', 'Password should be atleast 8 Characters long']}
                            variant="outlined"
                            required

                            style={{ width: '80%' }}
                        />
                    </Center>
                    <br />
                    <Center>
                        <TextValidator
                            label="Confirm Password"
                            onChange={this.handleSignup}
                            name="confirmpassword"
                            type="password"
                            value={SignUpData.confirmpassword}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['This Field is required', 'Passwords Mismatch']}
                            variant="outlined"
                            required

                            style={{ width: '80%' }}
                        />
                    </Center>
                    <br />
                    <Center>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            disabled={signupSubmitted}
                        >
                            {
                                (signupSubmitted && 'Your form is submitted!')
                                || (!signupSubmitted && 'Submit')
                            }
                        </Button>
                    </Center>
                </ValidatorForm>
            </MuiThemeProvider>
        }



        return (
            <MuiThemeProvider theme={customTheme}>
                <Paper style={divStyle}>
                    <AppBar position="static">
                        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="Login" {...a11yProps(0)} style={{width:'50%'}}/>
                            <Tab label="Sign Up" {...a11yProps(1)} style={{ width: '50%' }}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.value} index={0}>
                            <MuiThemeProvider theme={customInputTheme}>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.handleLoginSubmit}
                                    onError={errors => console.log(errors)}
                                    style={{ width: '100%' }}
                                >
                                    <Center>
                                        <TextValidator
                                            label="Email"
                                            onChange={this.handleLogin}
                                            name="email"
                                            value={loginData.email}
                                            validators={['required', 'isEmail', 'isEmailSomaiya']}
                                            errorMessages={['Email Dena Padega Bro/Sis', 'Aeee Mail Daal', 'Aeee Bro Somaiya Wala']}
                                            variant="outlined"
                                            required

                                            style={{ width: '80%' }}
                                            />
                                    </Center>
                                <br />
                                <Center>
                                    <TextValidator
                                        label="Password"
                                        onChange={this.handleLogin}
                                        name="password"
                                        type="password"
                                        value={loginData.password}
                                        validators={['required','isMinLength']}
                                        errorMessages={['This Field is required','Password should be atleast 8 Characters long']}
                                        variant="outlined"
                                        required

                                        style={{ width: '80%' }}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        disabled={loginSubmitted}
                                    >
                                        {
                                            (loginSubmitted && 'Logging you in...')
                                            || (!loginSubmitted && 'Submit')
                                        }
                                    </Button>
                                </Center>
                                </ValidatorForm>
                            </MuiThemeProvider>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        {signupPanel}
                    </TabPanel>
                </Paper>
            </MuiThemeProvider >
        );
    }
}