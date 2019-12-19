import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexContent from '../components/IndexContent'
import '../styles/index.css'

export default function Index() {
    
    return (
        <div>
            <div id="content-wrap">
                <Header />
                <IndexContent url="http://localhost:8080" />
            </div>
            <Footer/>
        </div>
    );
  }
