import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NoiceBanner from "../components/NoiceBanner";
import SubmissionTeam from "../components/SubmissionTeam";
import { Grid, Container } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link"
import {
    useTheme,
    createMuiTheme,
    ThemeProvider
} from "@material-ui/core/styles";
import "../styles/index.css";

import Chaand from "../components/chaand";
import ReviewFilter from "../components/ReviewFilter";

import envvar from "../env";

export default class Review extends React.Component {
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
            found: [],
            loading: true,
        };

        this.handler = this.handler.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
        {
            this.setState({theme:localStorage.getItem('siteTheme')})
        }
        fetch(`${envvar.REACT_APP_SERVER_URL}/admin/submissions`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    teams: data.submissions,
                    found: data.submissions,
                    loading: false
                });
            })
            .catch(e => console.log(e));
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

    filterIt(ar, searchKey) {
        searchKey = searchKey.toLowerCase();
        return ar.filter(obj => {
            if (obj.teamName.toLowerCase().includes(searchKey)) return true;
            if (obj.submission.category.toLowerCase().includes(searchKey)) return true;
            if (obj.submission.domain.toLowerCase().includes(searchKey)) return true;
            if (obj.submission.company.toLowerCase().includes(searchKey)) return true;
            if (obj.submission.number.toLowerCase().includes(searchKey)) return true;
            if (obj.submission.title.toLowerCase().includes(searchKey)) return true;

        });
    }

    applyFilter(stateInput) {
        let found = [...this.state.teams];
        let { reviewed, unreviewed, searchfilter } = stateInput;

        console.log(stateInput);

        if (reviewed && !unreviewed)
            found = found.filter(obj => obj.submission.reviewed);
        else if (!unreviewed && reviewed)
            found = found.filter(obj => !obj.submission.reviewed);
        else if (!reviewed && !unreviewed) found = [];

        if (found.length > 0) {
            if (searchfilter) found = this.filterIt(found, searchfilter);
        }

        this.setState({
            found: found
        });
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
                    <title>Review</title>
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
                            <NoiceBanner
                                text="Review Teams"
                                backgroundImage={"/assets/images/banner.jpg"}
                            />
                            <ReviewFilter
                                filter={this.applyFilter}
                                loading={this.state.loading}
                                type="review"
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
                                    <SubmissionTeam
                                        teams={this.state.found}
                                        loading={this.state.loading}
                                    />
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
