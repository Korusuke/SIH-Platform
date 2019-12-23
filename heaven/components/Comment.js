import React from 'react'

import {Paper, Grid, Box} from '@material-ui/core'
import Center from 'react-center'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

import envvar from'../env'

export default function Comment(props)
{

    let profileImg = props.profilePic
            ? props.profilePic[0] == "/"
                ? `${envvar.REACT_APP_SERVER_URL}${props.profilePic}`
                : props.profilePic
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    return (

            <div style={{border: '1px solid #cdcdcd'}}>
                <div style={{ minHeight:'20px', padding: '5px'}}>
                   <Grid container direction="row">
                    <Grid item xs={2} sm={1}>
                            <div style={{overflow:'hidden', borderRadius:'50%', width: '100%',
                             paddingTop: '100%', position: 'relative'}}>
                                <img style={{width:'100%', height: 'auto',
                                        position: 'absolute', top: 0, left: 0}} src={profileImg}></img>
                            </div>
                        </Grid>
                       <Grid item xs={8} sm={10}>
                            <Box paddingLeft={1} height="100%" color="#444"><Center style={{height: '100%'}}><span style={{width:'100%'}}>{props.name} </span></Center></Box>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                             <Center style={{height: '100%'}}><div>{ props.deletable? <FontAwesomeIcon size="1x" icon={faTrash} style={{cursor:'pointer'}} onClick={()=>{props.onDelete(props.cid)}}/> : null}</div></Center>
                        </Grid>
                    </Grid>
                </div>
                <div style={{background: 'white', minHeight:'20px', padding: '15px'}}>
                <div style={{whiteSpace: 'pre-wrap'}}>
                    {props.message}
                </div>
                </div>

            </div>

    )
}