import React from 'react'
import Center from 'react-center'
import {Grid} from '@material-ui/core'

export default function NoiceBanner(props)
{
    return ( 
        <div style ={{
            backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : null,
            background: props.backgroundImage ? null : "purple",
            backgroundSize: 'cover',
            height : '30vh',
            maxHeight: '250px',
            width:"100%" 
        }}>
            <Grid container direction="row" style={{height:'100%'}}>
                <Grid item md={7} sm={12} style={{height:'100%'}}>
                <Center style={{height:'100%'}}>
                    <span style = {{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: props.fontSize ? props.fontSize : '40px',
                        fontWeight: 600,
                        color: props.color ? props.color : 'white'
                    }}>{props.text}</span>
                </Center>
                </Grid>
            </Grid>
        </div>
    )
}