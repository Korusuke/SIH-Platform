import React, { Component } from 'react'

import '../styles/problemcard.css';
// import logo from '../assets/GC.svg';

class ProblemCard extends Component {

  
  render() {

    return (
      <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      
        <div className="maincard">
          <div className="cardtitle">
            {this.props.card.title} 
          </div>
          <div className="cardorg">
          {this.props.card.org}
          </div>
          <div className="cardlogosmall">
            <i className="fa fa-code"></i>
          </div>
          <div id='test'>
            <div className="cardlogo">
              <img src={this.props.card.logo} />
            </div>
          </div>
          <div className="cardcode">
            {this.props.card.code}
          </div>          
          <div className="cardline"></div>
          <div className="carddata">
          {this.props.card.description}
            <div className="cardshare">
            <i className="material-icons">
          share
            </i>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default ProblemCard;
