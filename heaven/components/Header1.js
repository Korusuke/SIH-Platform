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

        }

    }
    return (
        <div>
            <AppBar position="static" style={
                {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '80px'
                }
            } >
                <Toolbar>
                    <Grid
                    container
                    direction="row"
                    >
                        <Grid item sm={1}>
                            <Center style={styles.center}>
                            <img src="/assets/images/somaiya.png" style={styles.image} width="100" />
                            </Center>
                        </Grid>
                        <Grid item sm={1}>
                            <Center style={styles.center}>
                                <img src="/assets/images/sihlogo.png" style={styles.image} width="100"/>
                            </Center>
                        </Grid>
                        <Grid item sm={8}>
                            <Center>
                                <h1>Internal Hackathon</h1>
                            </Center>
                        </Grid>
                        <Grid item sm={2}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar alt="Karan Sheth" src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png" />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                        </Grid>
                        
                    </Grid>

                </Toolbar>
            </AppBar>
        </div>
    )
}