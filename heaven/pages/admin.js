import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import Team from "../components/Team";
import { Grid, Container } from "@material-ui/core";
import Head from "next/head";
import {
    useTheme,
    createMuiTheme,
    ThemeProvider
} from "@material-ui/core/styles";
import "../styles/index.css";

import Chaand from "../components/chaand";

import envvar from "../env";

export default class Admin extends React.Component {
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
        super(props);
        this.props = props;
        this.state = {
            teams: [],
            found: []
        };

        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        fetch(`${envvar.REACT_APP_SERVER_URL}/admin`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    teams: data,
                    found: data
                });
            })
            .catch(e => console.log(e, "asd"));
    }

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
                    <title>Admin</title>
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
                            <Container>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={1}
                                    style={{ width: "100%" }}
                                >
                                    <Team teams={this.state.teams} />
                                </Grid>
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}
