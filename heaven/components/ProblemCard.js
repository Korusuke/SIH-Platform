import React, { Component } from 'react'
import Link from 'next/link';


import '../styles/problemcard.css';
import {Grid, ButtonBase} from '@material-ui/core'
// import logo from '../assets/GC.svg';

class ProblemCard extends Component {

  
  render() {

    return (
      <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <ButtonBase style={{width:'100%'}}>
        <Link href="/problem/[id]" as={`/problem/${this.props.card['_id']}`}>
        <div className="maincard">
          
        <Grid container direction="row" style={{
          minHeight: '80px'
        }}>
          <Grid item xs={2}>
            <div id='test'>
                  <img src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png" />
              </div>
            </Grid>
            <Grid item xs={5}>
            <div className="cardtitle">
              {this.props.card.Domain}
              </div>
            </Grid>
            <Grid item xs={5}>
            <div className="cardorg">
            {this.props.card.Company} 
          </div>
          <br/>
          <div className="cardcode">
            {this.props.card.code}
          </div> 
          <div className="cardlogosmall">
            <i className="fa fa-code"></i>
          </div>
            </Grid>
        </Grid>
         
          
          
          
                   
          <div className="cardline"></div>
          <div className="carddata">
          {this.props.card.Title}
            <div className="cardshare">
            <i className="material-icons">
          share
            </i>
            </div>
          </div>
        </div>
        </Link>
      </ButtonBase>
      </div>
    );
  }
}

export default ProblemCard;
