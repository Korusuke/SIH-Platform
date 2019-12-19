import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import Comment from '../components/Comment'
import '../styles/index.css'


export default function Index() {
    
    return (
        <div>
            <Comment name="Akshay Padte" time="19 Dec 2019"  delComment = {true} message={
                `dfgdfgfgfg
                 fhfdgdfg
                  fdgdfgfg
                   dfgf gdfg fdg fdgdfgf bfgdfg`
            
                   }/>
        </div>
    );
  }