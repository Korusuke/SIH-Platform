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


let cache = {};
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
        // console.log(this.props.problems)
        this.state = {
            found: this.props.problems.filter(obj => true),
            theme:  "light",
            allLabels: {},
            labelLoading: true
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
                localStorage.setItem('siteTheme', 'light')
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

        let { software, hardware, ideas, searchfilter, orgs, labels} = stateInput;

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

        console.log(labels)
        if(labels.length > 0)
        {
            
            found = found.filter(obj => this.state.allLabels[obj.Number] && 
                ( this.state.allLabels[obj.Number].labels.filter(e=>labels.includes(e.label)).length > 0));
        }


        // console.log("ORG", orgs, found[0].Company);
        // console.log(orgs.includes(found[0].Company));
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

        let filter = {
            software,
            hardware,
            ideas,
            searchfilter,
            orgs,
            labels
        }

        localStorage.setItem('problemFilter', JSON.stringify(filter))
    }

    componentDidMount()
    {
        if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
        {
            this.setState({theme:localStorage.getItem('siteTheme')})
        }

        localStorage.setItem('problems', JSON.stringify(this.props.problems))

        fetch(`${envvar.REACT_APP_SERVER_URL}/ps/all_labels`, {
            credentials:'include',
        }).then(res => res.json()).then(data => {
            this.setState({
                allLabels: data,
                labelLoading: false
            })
        }).catch(e => console.log(e))
    }

    render() {
        const customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == "light" ? "light" : "dark"
            }
        });
        let curtheme =
        this.state.theme == "light" ? this.theme.light : this.theme.dark;

        if (process.browser) {
            cache['problems'] = this.props.problems;
        }
    

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
                            <Header loggedin={true} theme={customtheme} themeState={this.state.theme}/>
                            <NoiceBanner
                                text="Problem Statements"
                                backgroundImage={"/assets/images/banner.jpg"}
                            />
                            <Filter
                                filter={this.applyFilter}
                                cards={this.props.problems}
                                theme={customtheme}
                                themeState={this.state.theme}
                                allLabels={this.state.allLabels}
                                labelLoading={this.state.labelLoading}
                            />
                            <ProblemsContainer
                                cards={this.state.found}
                                url={envvar.REACT_APP_SERVER_URL}
                                theme={customtheme}
                                themeState={this.state.theme}
                                allLabels={this.state.allLabels}
                                labelLoading={this.state.labelLoading}
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
    let res; 
    let data; 

    
    //if data is in cache then use the cache
    if (cache['problems']) {
        data = cache['problems']
    } else {
        res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`);
        data = await res.json();
    }

    return {
        problems: data
    };
};
