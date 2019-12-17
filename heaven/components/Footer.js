import React from 'react';
import { shadows } from '@material-ui/system'
import {Grid, Box} from '@material-ui/core'
import Center from 'react-center'
export default function Footer(){
    return (
        
            <Box boxShadow={3} style={{
               position:'absolute',
               bottom:0,
               width: '100%',
               height:'45px',
               background:'white',
               boxSizing:'border-box'
            }}
            
            >
             <Center style={{height:'100%'}}>
                 <span><b>Made by Team Probably</b></span>
                 </Center>  
            </Box>
        
    )
}