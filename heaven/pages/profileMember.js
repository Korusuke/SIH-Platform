import React from 'react'

import Header from '../components/Header'
import Profile from '../components/Profile';


import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';

import {Container, Paper} from '@material-ui/core' 

import '../styles/index.css'

export default function ProfileMember(){
    return(
        <div>
        <Header/>
        <Container maxWidth="xl">
        <Paper style={{
            padding: '40px'
        }}>
        < Profile />
        </Paper>
        <Bottomcardteam />
            <Bottomcardjoin />
            <Bottomcardfirst />
            <Bottomcardconf />
        </Container>
        </div>
    );
}