import React, { Component } from 'react';

import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';


import {Paper} from '@material-ui/core'

export default class BottomCardMerge extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            show: 0
        }

        this.changeState = this.changeState.bind(this)
    }

    changeState(newShow)
    {
        this.setState(
            {
                show: newShow
            }
        )
    }
    render()
    {
        let toShow
        if(this.state.show === 0)
        {
            toShow = <Bottomcardfirst  changeParentState={this.changeState}/>
        }
        else if(this.state.show === 1)
        {
            toShow = <Bottomcardjoin  changeParentState={this.changeState}/>
        }
        else if(this.state.show === 2)
        {
            toShow = <Bottomcardteam  changeParentState={this.changeState}/>
        }
        else{
            toShow = <Bottomcardconf  changeParentState={this.changeState}/>
        }
        return (
            <div>
                <Paper style={{padding: '50px'}}>
                {toShow}
                </Paper>
            </div>
        )
    }
}