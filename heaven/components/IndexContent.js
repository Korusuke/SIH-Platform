import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Login from '../components/Login'
import Timeline from '../components/Timeline';
import { Grid , Paper,  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }));


export default function IndexContent()
{
    return(
        <Grid 
            container
            direction="row"
        >
            <Grid item md={6} xs={12}>
                <Timeline />
            </Grid>
            <Grid item md={6} xs={12}>
                <Login />
            </Grid>

        </Grid>
    )
}