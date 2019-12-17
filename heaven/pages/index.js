import React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Login from '../components/Login'
import Timeline from '../components/Timeline';

export default function Index() {
    return (
        <div>
            <Header/>
            <Timeline />
            <Login/>
            <Footer />
      </div>
    );
  }
