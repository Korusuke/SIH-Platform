import React from "react";

import Center from "react-center";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Chaand from "../../components/chaand";
import Head from "next/head";
import "../../styles/index.css";
import { TextField, Paper, Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
    useTheme,
    createMuiTheme,
    ThemeProvider
} from "@material-ui/core/styles";

//import Center from 'react-center'

import Snackbar from "../../components/snackbar";
import envvar from "../../env";

export default class ResetPage extends React.Component {
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
            password: "",
            emailSubmitted: false,
            snack: false,
            verifying: 0 // 0 = yet to be verified, 1 = incorrect, 2 = correct
        };
        this.handler = this.handler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    snackcontent = "";

    handleLoginSubmit() {
        this.setState({
            emailSubmitted: true
        });

        fetch(`${envvar.REACT_APP_SERVER_URL}/reset/${this.props.Token}`, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ password: this.state.password })
        })
            .then(res => res.json())
            .then(data => {
                console.log("hiii");
                console.log(data);
                this.snackcontent = (
                    <Snackbar type={data.status} msg={data.msg} />
                );
                console.log(this.snackcontent);
                this.setState({
                    emailSubmitted: false,

                    snack: true
                });

                setTimeout(() => {
                    this.setState({ snack: false });
                }, 3000);

                setTimeout(() => {
                    location.href = '/'
                }, 3000);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        if (
            localStorage.getItem("siteTheme") &&
            this.state.theme != localStorage.getItem("siteTheme")
        ) {
            this.setState({ theme: localStorage.getItem("siteTheme") });
        }

        ValidatorForm.addValidationRule("isMinLength", value => {
            if (value.length < 8) {
                return false;
            }
            return true;
        });

        fetch(`${envvar.REACT_APP_SERVER_URL}/reset/${this.props.Token}`, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log("hiii");
                console.log(data);

                if (data.status == "failure")
                    this.setState({
                        
                        verifying: 1
                    });
                else if(data.status == "success")
                    this.setState({
                        
                        verifying: 2
                    });
            })
            .catch(e => {
                console.log(e);
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
                            <br />
                            <div>
                                {this.state.verifying == 0 ? (
                                    <Center>
                                        <h2>Verifying Link</h2>
                                    </Center>
                                ) : this.state.verifying == 1 ? (
                                    <Center>
                                        <h2>Invalid Link</h2>
                                    </Center>
                                ) : (
                                    <Paper
                                        style={{
                                            maxWidth: "500px",
                                            margin: "auto",
                                            padding: "10px"
                                        }}
                                    >
                                        <ValidatorForm
                                            ref="form"
                                            onSubmit={this.handleLoginSubmit}
                                            onError={errors =>
                                                console.log(errors)
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <Center>
                                                <TextValidator
                                                    label="New Password"
                                                    onChange={this.handleChange}
                                                    name="password"
                                                    type="password"
                                                    value={this.state.password}
                                                    validators={[
                                                        "required",
                                                        "isMinLength"
                                                    ]}
                                                    errorMessages={[
                                                        "This Field is required",
                                                        "Password should be atleast 8 Characters long"
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
                                                        this.state
                                                            .emailSubmitted
                                                    }
                                                >
                                                    Submit
                                                </Button>
                                            </Center>
                                        </ValidatorForm>
                                    </Paper>
                                )}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

ResetPage.getInitialProps = async function(context) {
    // const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {
    //     headers: {
    //         origin: "google.com"
    //     }
    // });
    // const data = await res.json();

    // //console.log(data);
    const Token = context.query.Token;
    return {
        Token: Token
    };
};
