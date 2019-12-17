import React, { Component } from 'react';
import { Card, TextField, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import "../styles/Login.css";
// import Head from 'next/head';


export default class Login extends React.Component{
    constructor(props) {
        super(props);
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onSignUp = this.onSignUp.bind(this);

        this.state = {
            email: "",
            password: "",
            confirm: "",
            tab: 'login',
            log_tab: 'block',
            sign_tab: 'none'
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeConfirm(e) {
        this.setState({
            confirm: e.target.value
        })
    }

    onTabChange(e) {
        if (this.state.tab == 'login'){
            this.setState({
                tab: 'signup',
                log_tab: 'block',
                sign_tab: 'none'
            })
        } else {
            this.setState({
                tab: 'signup',
                log_tab: 'block',
                sign_tab: 'none'
            })
        }
        console.log('tab changed');
    }

    onLogin(e) {
        console.log("Login");
        
    }

    onSignUp(e) {
        // if (this.state.confirm == this.state.password) {
        //     // sending request
        // } else {

        // }
        console.log("submit");
    }

    render() { 
        return (
            <div>
                <Button>Login</Button>
                <Button>SignUp</Button>

                <Card style={{display: this.state.log_tab}}>
                    <form onSubmit={this.onLogin}>
                        <TextField id="email" label="Email-id" 
                            value={this.state.email} onChange={this.onChangeEmail} required/>
                        <br/><br/>
                        <TextField type="password" id="password" label="Password" variant="outlined" 
                            value={this.state.password} onChange={this.onChangePassword} required/>
                        <br/><br/>
                        <Button type="submit">Login</Button>
                    </form>
                </Card>
                <Card style={{display: this.state.sign_tab}}>
                    <form onSubmit={this.onSignup}>
                        <TextField label="Email-id" 
                            value={this.state.email} onChange={this.onChangeEmail} required/>
                        <br/><br/>
                        <TextField type="password" label="Password" variant="outlined" 
                            value={this.state.password} onChange={this.onChangePassword} required/>
                        <br/><br/>
                        <TextField type="password" label="Confirm Password" variant="outlined" 
                            value={this.state.confirm} onChange={this.onChangeConfirm} required/>
                        <br/><br/>
                        <Button type="submit">SignUp</Button>
                    </form>
                </Card>
            </div>
        );
    }
}