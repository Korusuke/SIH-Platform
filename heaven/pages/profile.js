import React from 'react'

import Header from '../components/Header'
import Profile from '../components/Profile';


import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';
import BottomCardMerge from '../components/BottomCardMerge'
import {Container, Paper} from '@material-ui/core'

import '../styles/index.css'

import envvar from '../env'

export default class ProfileMember extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            allowTeam: false
        }

        this.changeState = this.changeState.bind(this)

    }

    changeState(obj)
    {
        this.setState(obj)
    }

    render()
    {
        return(
            <div>
            <Header/>
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
        );
    }
}