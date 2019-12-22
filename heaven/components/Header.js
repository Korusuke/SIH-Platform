import React from 'react';
import { AppBar, Avatar,Toolbar,Grid } from '@material-ui/core/';
import Center from 'react-center';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Cookies from 'universal-cookie';
import AppsIcon from '@material-ui/icons/Apps';
export default function Header(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profilePic, setProfilePic] = React.useState(null);

    const handleProfile = () => 
    {
        location.href='/profile'
    }
    const handleProblems = () => 
    {
        location.href='/problems'
    }
    const handleClick = event => {
        console.log('open')
      setAnchorEl(event.currentTarget);
    };
    const handleLogout = () =>{
        const cookies = new Cookies()
        cookies.remove('token')
        location.href = '/'
    }
    const handleClose = () => {
        console.log('close')
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
                        { props.loggedin ?
                        <Grid item sm={2} xs={12}>
                        <Center style={{height:'100%'}}>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <AppsIcon  style={{color:'black', fontSize:'32px'}} />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                // keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleProblems}>Problems</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                            </Center>
                        </Grid> 
                        :
                        null
                        }
                        
                        
                        
                    </Grid>

                </Toolbar>
            </AppBar>
        </div>
    )
}