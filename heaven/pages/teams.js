import React from 'react'
import NoiceBanner from '../components/NoiceBanner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Team from '../components/Team';
import Head from 'next/head';
import axios from 'axios';
import { Container } from '@material-ui/core';

export default class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.getTeamCards = this.getTeamCards.bind(this);

             
        this.state = {
            teams: []
        }
        
        axios.get('http://localhost:8000/team')
            .then(response => {
                this.setState({teams: response})
                console.log(response);
            })
    }

    render(){
        
        return (
            <div>
            <Head>
                <title>Teams</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>
            <Header />
            <Team teams={this.state.teams} />
            {/* <NoiceBanner text="Teams" backgroundImage={"/assets/images/banner.jpg"} /> */}
            {/* <Footer /> */}
        </div>
        );
    }
}
