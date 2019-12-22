import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'




export default class chaand extends React.Component{
    constructor(props)
    {
        super(props);
        console.log(props);
        this.state = {
            chaand : props.chaand,
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.chaand !== state.chaand) {
            return { chaand: props.chaand };
        }
        console.log('possible error');
        return null;
    }

    render(){
        let chaand
        if(this.state.chaand)
        {
            chaand = <Fab size="small" style={{ backgroundColor: "#FFFFFF" }} onClick={this.props.handler}>
                <FontAwesomeIcon icon={faMoon} width="18" style={{color:'#212020' }} />
        </Fab>
        }
        else{
            chaand = <Fab size="small" style={{ backgroundColor: "#212020" }} onClick={this.props.handler}>
                <FontAwesomeIcon icon={faSun} width="18" style={{color:'#FFFFFF' }} />
        </Fab>
        }
        return (
            <div style={{
                position: 'fixed', right:'50px', bottom:'50px'
            }}>

             {chaand}
            </div>
        )
    }
}