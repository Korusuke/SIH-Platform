import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexContent from '../components/IndexContent'
import Chaand from '../components/chaand';

import '../styles/index.css';
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import envvar from '../env'

export default class extends React.Component  {

    theme = {
        dark: {
            background: '#121212',
            text: '#FFFFFF',
        },
        light: {
            background: '#FCFCFC',
            text: '#000000',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
        this.handler = this.handler.bind(this)
    }

    componentDidMount()
    {
        if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
        {
            this.setState({theme:localStorage.getItem('siteTheme')})
        }
    }


    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        } else {
            this.setState({
                theme: 'light'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        }
    }

    render() {
        let customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == 'light' ? 'light' : 'dark',
            },
        });
        let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;

        return (
            <ThemeProvider theme={customtheme}>
            <div style={{minHeight:'100vh', background: curtheme.background, color: curtheme.text}} >
                <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
                <div id="content-wrap" style={{ backgroundColor: `${curtheme.background}`, color: `${curtheme.text}` }}>
                    <Header />
                    <IndexContent url={envvar.REACT_APP_SERVER_URL} theme={customtheme} themeState={this.state.theme}/>
                </div>
                <Footer />
                </div>
            </ThemeProvider>
        )
    };
  }
