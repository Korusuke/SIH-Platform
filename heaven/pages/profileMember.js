import React from 'react'

import Header from '../components/Header'
import Profile from '../components/Profile';

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
        </Container>
        </div>
    );
}