import React from 'react';
import { AppBar, Avatar,Toolbar,Grid } from '@material-ui/core/';
import Center from 'react-center';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Header(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
    let styles = {
        center:{
            height: '100%'
        },
        image:{
            backgroundSize: 'contain',
            width: '100%',
            maxWidth: '100px'
        }

    }
    return (
        <div>
            <AppBar position="static" style={
                {
                    backgroundColor: 'white',
                    color: 'black',
                    height: 'auto'
                }
            } >
                <Toolbar>
                    <Grid
                    container
                    direction="row"
                    spacing={0}
                    >
                        <Grid item sm={1} xs={6}>
                            <Center style={styles.center}>
                            <img src="/assets/images/somaiya.png" style={styles.image}/>
                            </Center>
                        </Grid>
                        <Grid item sm={1} xs={6}>
                            <Center style={styles.center}>
                                <img src="/assets/images/sihlogo.png" style={styles.image}/>
                            </Center>
                        </Grid>
                        <Grid item sm={8} xs={12}>
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