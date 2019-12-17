import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import ProblemCard from '../components/ProblemCard'
import '../styles/index.css'
import fetch from 'isomorphic-unfetch';
import ProblemsContainer from '../components/ProblemsContainer'

export default function Problems(props) {
    console.log(props.problems);
    return (
        <div>
            <Header />
            <ProblemsContainer cards={props.problems} />
            <Footer/>
        </div>
    );
  }

  Problems.getInitialProps = async function() {
    const res = await fetch('http://f54fd373.ngrok.io');
    const data = await res.json();
  
    console.log(data);
  
    return {
      problems: data.ps
    };
  };