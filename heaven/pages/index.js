import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexContent from '../components/IndexContent'
import Chaand from '../components/chaand';

import '../styles/index.css'

export default class extends React.Component  {

    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
        this.handler = this.handler.bind(this)
    }

    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            })
        } else {
            this.setState({
                theme: 'light'
            })
        }
    }

    render() {
        return (
            <div>
                <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
                <div id="content-wrap">
                    <Header />
                    <IndexContent url="http://localhost:8080" />
                </div>
                <Footer />
            </div>
        )
    };
  }
