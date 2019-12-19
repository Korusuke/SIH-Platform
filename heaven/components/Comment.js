import React from 'react'

import {Paper, Grid} from '@material-ui/core'
import Center from 'react-center'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'



export default function Comment(props)
{
    
    
    return (
        <Paper>
            <div>
                <div style={{background: '#f8f8f8', minHeight:'20px', padding: '5px', borderBottom: '1px solid #cdcdcd'}}>
                   <Grid container direction="row">
                       <Grid item xs={10} sm={11}>
                            <div>{props.name} <span style={{color: '#555', fontSize: 'small'}}> {props.time} </span></div>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                             <Center><div>{ props.delComment? <FontAwesomeIcon size="1x" icon={faTrash} /> : null}</div></Center>
                        </Grid>
                    </Grid>
                </div>
                <div style={{background: 'white', minHeight:'20px', padding: '5px'}}>
                <div style={{whiteSpace: 'pre-wrap'}}>
                    {props.message}
                </div>
                </div>

            </div>
        </Paper>
    )
}