import React from "react";
import NoiceBanner from "../components/NoiceBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Filter from "../components/Filter";
import fetch from "isomorphic-unfetch";
import ProblemsContainer from "../components/ProblemsContainer";
import Head from "next/head";

import Chaand from "../components/chaand";

import "../styles/index.css";
import {
    useTheme,
    createMuiTheme,
    ThemeProvider
} from "@material-ui/core/styles";

import envvar from "../env";

export default class Problems extends React.Component {
    // console.log(props.problems);

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
        //console.log(this.props)
        this.state = {
            found: this.props.problems.filter(obj => true),
            theme:  "light"
        };

        this.applyFilter = this.applyFilter.bind(this);
        this.handler = this.handler.bind(this);
    }

    // componentDidMount()
    // {
    //     if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
    //     {
    //         this.setState({theme:localStorage.getItem('siteTheme')})
    //     }
    // }

    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        } else {
            this.setState({
                theme: 'light'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        }
    }

    filterIt(ar, searchKey) {
        return ar.filter(obj =>
            Object.keys(obj).some(key =>
                obj[key].toLowerCase().includes(searchKey.toLowerCase())
            )
        );
    }
    applyFilter(stateInput) {
        let found;

        let { software, hardware, ideas, searchfilter, orgs } = stateInput;

        console.log(stateInput);

        if (software && hardware)
            found = this.props.problems.filter(
                obj => obj.Category == "Software" || obj.Category == "Hardware"
            );
        else if (software)
            found = this.props.problems.filter(
                obj => obj.Category == "Software"
            );
        else if (hardware)
            found = this.props.problems.filter(
                obj => obj.Category == "Hardware"
            );
        else found = this.props.problems.filter(obj => false);

        console.log("ORG", orgs, found[0].Company);
        console.log(orgs.includes(found[0].Company));
        //console.log(found)
        if (orgs.length > 0)
            found = found.filter(obj => orgs.includes(obj.Company));

        console.log("IDEAS", ideas);
        if (ideas.length > 0)
            found = found.filter(obj => ideas.includes(obj.Domain));

        if (searchfilter) found = this.filterIt(found, searchfilter);

        this.setState({
            found: found
        });
    }

    componentDidMount()
    {
        if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
        {
            this.setState({theme:localStorage.getItem('siteTheme')})
        }
    }

    render() {
        const customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == "light" ? "light" : "dark"
            }
        });
        let curtheme =
            this.state.theme == "light" ? this.theme.light : this.theme.dark;

        // console.log(this.state.found.length)
        return (
            <div style={{
                backgroundColor: `${curtheme.background}`,
                color: `${curtheme.text}`
            }}>
                <Head>
                    <title>Problem Statements</title>
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
                    <div style={{ minHeight: "100vh" }}>
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
                            <Header loggedin={true} />
                            <NoiceBanner
                                text="Problem Statements"
                                backgroundImage={"/assets/images/banner.jpg"}
                            />
                            <Filter
                                filter={this.applyFilter}
                                cards={this.props.problems}
                                theme={customtheme}
                                themeState={this.state.theme}
                            />
                            <ProblemsContainer
                                cards={this.state.found}
                                url={envvar.REACT_APP_SERVER_URL}
                                theme={customtheme}
                                themeState={this.state.theme}
                            />
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

Problems.getInitialProps = async function() {
    const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`);
    const data = await res.json();

    //console.log(data);

    return {
        problems: data
    };
};
