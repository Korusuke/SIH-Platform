import React, { Component } from 'react';

import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';


import Snackbar from './snackbar';

import {Paper} from '@material-ui/core'

export default class BottomCardMerge extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        console.log(
            this.props.initState
        )
        this.state = {
            show: 0,
            InviteCode: "",
            snack: true,
            team: {}
        }

        this.changeState = this.changeState.bind(this)
    }

    snackcontent = '';

    componentDidMount()
    {
        console.log('hii')
    try{
        fetch(`${this.props.url}/team/currentTeam`,
        {
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method:'POST',

        }).then(res=>res.json()).then(data=>{
            console.log('hiii')
            console.log(data)
                this.setState({
                    show: data.state? data.state: 0,
                    team: data.team? data.team: {}
                }
            )
        })

        //console.log(data);

    }catch(e){
        console.log(e)
        return {
            initState: 0,
            initTeam: {}
        }
    }
    }
    changeState(newShow, obj)
    {
        if(obj)
        {
            this.snackcontent = <Snackbar type={obj.status} msg={obj.msg} />
            if(newShow === -1)
            {
                this.setState({snack: true})
            }
            else{
                console.log(obj.team)
                this.setState(
                    {
                        show: newShow,
                        inviteCode: obj.inviteCode,
                        snack: true,
                        team: obj.team
                    }
                )
            }

            setTimeout(() => {
                this.setState({ snack: false });
            }, 3000);
        }
        else{
            this.setState(
                {
                    show: newShow
                }
            )
        }
    }
    render()
    {
        let toShow
        if(this.state.show === 0)
        {
            toShow = <Bottomcardfirst  changeParentState={this.changeState} url={this.props.url} allowTeam={this.props.allowTeam}/>
        }
        else if(this.state.show === 1)
        {
            toShow = <Bottomcardjoin  changeParentState={this.changeState} url={this.props.url}/>
        }
        else if(this.state.show === 2)
        {
            toShow = <Bottomcardteam  changeParentState={this.changeState} url={this.props.url}/>
        }
        else{
            toShow = <Bottomcardconf  changeParentState={this.changeState} url={this.props.url} team={this.state.team}/>
        }
        return (
            <div>
                <Paper style={{padding: '50px'}}>
                {toShow}
                </Paper>

                {this.state.snack ? this.snackcontent : null}
            </div>
        )
    }
}
