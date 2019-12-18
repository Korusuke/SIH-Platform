import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'




export default class chaand extends React.Component{
    constructor()
    {
        super();
        this.state = {
            chaand : 1
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        if(this.state.chaand) this.setState({chaand:0})
        else this.setState({chaand:1})
    }

    render(){
        let chaand
        if(this.state.chaand)
        {
            chaand = <Fab size="small" style={{backgroundColor:"#FFFFFF"}}>
            <FontAwesomeIcon icon={faMoon} style={{color:'#212020' }} onClick={this.handleClick}/>
        </Fab>
        }
        else{
            chaand=<Fab size="small"  style={{backgroundColor:"#212020"}}>
            <FontAwesomeIcon icon={faSun} style={{color:'#FFFFFF' }} onClick={this.handleClick}/>
        </Fab>
        }
        return (
            <div>
            
        {chaand}
    </div>
        
            
        )
    }
}