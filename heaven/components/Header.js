import React from 'react';
import { AppBar, Avatar,Toolbar,Grid } from '@material-ui/core/';
import Center from 'react-center';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Router from "next/router";
import Link from "next/link";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import Favicon from 'react-favicon';
import Cookies from 'universal-cookie';
import AppsIcon from '@material-ui/icons/Apps';

import Tracker from '../components/tracker';

export default function Header(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [profilePic, setProfilePic] = React.useState(null);

    const handleProfile = () =>
    {
        Router.push("/profile");
    }
    const handleProblems = () =>
    {
        Router.push("/problems");
    }
    const handleClick = event => {
        console.log('open')
      setAnchorEl(event.currentTarget);
    };
    const handleLogout = () =>{
        const cookies = new Cookies()
        cookies.remove('token')
        // Router.push("/");
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
    // console.log(props)
    return (
        <div>
            <Tracker />
            <Favicon url="/assets/favicon/favicon.ico" />
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
                                <MenuItem ><Link href="/profile" as={"/profile"}><a style={{textDecoration: 'none',  color:props.themeState == 'dark'? 'white':'black'}}>Profile</a></Link></MenuItem>
                                <MenuItem ><Link href="/problems" as={"/problems"}><a style={{textDecoration: 'none', color:props.themeState == 'dark'? 'white':'black'}}>Problems</a></Link></MenuItem>
                                <MenuItem ><Link href="/submission" as={"/submission"}><a style={{textDecoration: 'none', color:props.themeState == 'dark'? 'white':'black'}}>Submission</a></Link></MenuItem>
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
