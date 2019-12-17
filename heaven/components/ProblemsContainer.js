import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Login from '../components/Login'
import Timeline from '../components/Timeline';
import { Grid, Paper,  Box, Container, CardActions} from '@material-ui/core';

import ProblemCard from './ProblemCard'

export default function ProblemsContainer(props)
{
    let arr = props.cards.map((card)=>(
    <Grid  item xs={12}  md={4} >
        <ProblemCard card={card}/>
    </Grid>
    ))

    console.log(arr)

    return (
        <Container maxWidth="xl" style={{paddingTop:'100px'}}>
            <Grid container spacing={1}>
                    {arr}
                </Grid>
        </Container>
            )
}