import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Login from '../components/Login'
import Timeline from '../components/Timeline';
import { Grid , Paper,  Box, Container} from '@material-ui/core';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import { getThemeProps } from '@material-ui/styles';

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


export default function IndexContent(props)
{
  let theme = props.theme
    return(
        <Container maxWidth="lg" style={{paddingTop:'5%',paddingBottom: '45px'}} >
          <Grid
              container
              direction="row"
              spacing={3}
              justify = 'center'
          >
            <Grid item md={8} xs={10} style={{ padding: '10px' }}>
              <Paper>
                <div style={{ width: '100%', margin:'auto' }}>
                <Timeline theme={props.theme}/>
                </div>
              </Paper>
            </Grid>
            <Grid item md={4} xs={10} style={{ padding: '10px' }}>
              <Grid item xs={12} style={{ padding: '10px' }}>
                <Login url={props.url} theme={props.theme} themeState={props.themeState}/>
              </Grid>
              <Grid item xs={12} style={{ padding: '10px' }}>
              <Paper style={{ padding: '10px' }} >
                  In Case of any issues please contact <br/><a href="mailto:sih-kjsce@somaiya.edu">sih-kjsce@somaiya.edu</a>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
    )
}