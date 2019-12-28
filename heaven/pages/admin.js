import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Profile from '../components/Profile';
import Team from '../components/Team';
import { Grid } from '@material-ui/core';
import Head from "next/head";

import "../styles/index.css";

import envvar from '../env'

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
    }

    componentWillMount() {
        fetch(`${envvar.REACT_APP_SERVER_URL}/admin`, {
            credentials:'include',
        }).then(res => res.json()).then(data => {
            this.setState({
                teams: data,
                found: data
            })
        }).catch(e => console.log(e, 'asd'))
    }

    render() {
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
                {/* <Header loggedin={true} theme={customtheme} themeState={this.state.theme}/> */}
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}
                    style={{width: '100%'}}>
                    <Team teams={this.state.teams}/>
                </Grid>
                {/* <Footer /> */}
            </div>
        )
    }
}