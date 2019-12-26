import React from "react";

import Center from 'react-center'
import Footer from "../components/Footer";
import Header from "../components/Header";
import Chaand from "../components/chaand";
import Head from "next/head";
import "../styles/index.css";
import { TextField, Paper, Button } from "@material-ui/core";
import {
    ValidatorForm,
    TextValidator,
} from "react-material-ui-form-validator";
import {
    useTheme,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";

//import Center from 'react-center'

import Snackbar from '../components/snackbar';
import envvar from "../env";

export default class Forgots extends React.Component {
    theme = {
        dark: {
            background: "#121212",
            text: "#FFFFFF"
        },
        light: {
            background: "#FCFCFC",
            text: "#000000"
        }
    };

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            theme: "light",
            email: "",
            emailSubmitted: false,
            snack: false,
        };
        this.handler = this.handler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    snackcontent = ''

    handleLoginSubmit()
    {
        this.setState({
                
            emailSubmitted: true
        });

        fetch(`${envvar.REACT_APP_SERVER_URL}/forgotPassword`,
        {
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method:'POST',
            body:JSON.stringify(
                {email: this.state.email}
            )

        }).then(res=>res.json()).then(data=>{
            console.log('hiii')
            console.log(data);
            this.snackcontent = <Snackbar type={data.status} msg={data.msg} />;
            console.log(this.snackcontent)
            this.setState({
                
                emailSubmitted: false,

                snack: true
            });

            
            setTimeout(() => {
                this.setState({ snack: false });
            }, 3000);
           

        }).catch(e=>{
            console.log(e)
        })

    }

    componentDidMount() {
        if (
            localStorage.getItem("siteTheme") &&
            this.state.theme != localStorage.getItem("siteTheme")
        ) {
            this.setState({ theme: localStorage.getItem("siteTheme") });
        }

        ValidatorForm.addValidationRule('isEmailSomaiya', (value) => {
            if (value.slice(-11) !== 'somaiya.edu' && value.slice(-11) !== 'yopmail.com') {
                return false;
            }
            return true;
        });
    }

    handleChange = event => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handler() {
        if (this.state.theme == "light") {
            this.setState(
                {
                    theme: "dark"
                },
                () => {
                    localStorage.setItem("siteTheme", "dark");
                }
            );
        } else {
            this.setState(
                {
                    theme: "light"
                },
                () => {
                    localStorage.setItem("siteTheme", "light");
                }
            );
        }
    }

    render() {
        let customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == "light" ? "light" : "dark"
            }
        });
        let curtheme =
            this.state.theme == "light" ? this.theme.light : this.theme.dark;

        return (
            <div>
                <Head>
                    <title>SIH - KJSCE</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <ThemeProvider theme={customtheme}>
                    <div
                        style={{
                            minHeight: "100vh",
                            background: curtheme.background,
                            color: curtheme.text
                        }}
                    >
                        <Chaand
                            handler={this.handler}
                            chaand={this.state.theme == "light" ? 1 : 0}
                        />
                        <div
                            id="content-wrap"
                            style={{
                                backgroundColor: `${curtheme.background}`,
                                color: `${curtheme.text}`
                            }}
                        >
                            <Header
                                theme={customtheme}
                                themeState={this.state.theme}
                            />
                            <br/>
                            <div>
                                {this.state.snack ? this.snackcontent : null}
                                <Paper style={{maxWidth:'500px', margin:'auto', padding:'10px'}}>
                                    <ValidatorForm
                                        ref="form"
                                        onSubmit={this.handleLoginSubmit}
                                        onError={errors => console.log(errors)}
                                        style={{ width: "100%" }}
                                    >
                                        <Center>
                                            <TextValidator
                                                label="Email"
                                                onChange={this.handleChange}
                                                name="email"
                                                value={this.state.email}
                                                validators={[
                                                    "required",
                                                    "isEmail",
                                                    "isEmailSomaiya"
                                                ]}
                                                errorMessages={[
                                                    "Email Dena Padega Bro/Sis",
                                                    "Aeee Mail Daal",
                                                    "Aeee Bro Somaiya Wala"
                                                ]}
                                                variant="outlined"
                                                required
                                                style={{ width: "80%" }}
                                            />
                                        </Center>
                                        <br />

                                        <br />
                                        <Center>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                type="submit"
                                                disabled={
                                                    this.state.emailSubmitted
                                                }
                                            >
                                                Submit
                                            </Button>
                                        </Center>
                                    </ValidatorForm>
                                </Paper>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}


