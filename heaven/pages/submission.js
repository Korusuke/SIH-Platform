import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SubmissionCard from "../components/SubmissionCard";
import NoiceBanner from "../components/NoiceBanner";
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

export default class Submission extends React.Component {
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
                    <title>Submission</title>
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
                                 loggedin={true} theme={customtheme} themeState={this.state.theme}
                            />
                            <NoiceBanner
                                text="Submission"
                                backgroundImage={"/assets/images/banner.jpg"}
                            />
                            <SubmissionCard />
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}
