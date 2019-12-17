import React from 'react';
import {AppBar, Toolbar,Grid} from '@material-ui/core/';

import Center from 'react-center'

export default function Header(){

    let styles = {
        center:{
            height: '100%'
        },
        image:{
            backgroundSize: 'contain',
            width: '100%'
        }

    }
    return (
        <div>
            <AppBar position="static" style={
                {
                    backgroundColor: 'white',
                    color: 'black'
                }
            } >
                <Toolbar>
                    <Grid 
                    container 
                    direction="row"
                    spacing={3}
                    >
                        <Grid item xs={2} sm={1}>
                            <Center style={styles.center}>
                            <img src="/assets/images/somaiya.png" style={styles.image} />
                            </Center>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <Center style={styles.center}>
                                <img src="/assets/images/sihlogo.png" style={styles.image} />
                            </Center>
                        </Grid>
                        <Grid item xs={8} sm={10}>
                            <Center>
                                <h1>Internal Hackathon</h1>
                            </Center>
                        </Grid>
                        
                            
                    </Grid>
                
                </Toolbar>
            </AppBar>
        </div>
    )
}