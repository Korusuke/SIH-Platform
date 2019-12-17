import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexContent from '../components/IndexContent'
import Timeline from '../components/Timeline'
import '../styles/index.css'

export default function Index() {
    
    return (
        <div>
            <Header />
            <IndexContent />
            <Footer/>
        </div>
    );
  }