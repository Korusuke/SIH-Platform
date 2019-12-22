import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Profile from '../components/Profile';


import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';
import BottomCardMerge from '../components/BottomCardMerge'
import {Container, Paper} from '@material-ui/core'
import Chaand from '../components/chaand'

import '../styles/index.css'

import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import envvar from '../env'

export default class ProfileMember extends React.Component{
    
    theme = {
        dark: {
            background: '#121212',
            text: '#FFFFFF',
        },
        light: {
            background: '#FCFCFC',
            text: '#000000',
        }
    }
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            allowTeam: false,
            theme: 'light'
        }

        this.changeState = this.changeState.bind(this)

        this.handler = this.handler.bind(this)
    }


    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            })
        } else {
            this.setState({
                theme: 'light'
            })
        }
    }

    changeState(obj)
    {
        this.setState(obj)
    }

    render()
    {
        const customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == 'light' ? 'light' : 'dark',
            },
        });
        let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;

        return(
            <ThemeProvider theme={customtheme}>
            <div style={{minHeight:'100vh'}}>
                <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
                <div id="content-wrap" style={{ backgroundColor: `${curtheme.background}`, color: `${curtheme.text}` }}>
            <Header loggedin={true}/>
            <Container maxWidth="lg">
            <Paper style={{
                padding: '40px',
                marginTop: '50px',
            }}>
                <Profile changeParentState={this.changeState}/>

            </Paper >
            <br/>
                <BottomCardMerge url={envvar.REACT_APP_SERVER_URL} allowTeam={this.state.allowTeam}/>
            </Container>
            </div>
                <Footer />
                </div>
            </ThemeProvider>
        );
    }
}