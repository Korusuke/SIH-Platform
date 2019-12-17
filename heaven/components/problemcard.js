import React, { Component } from 'react';
import './problemcard.css';
// import logo from '../assets/GC.svg';

class App extends Component {
  render() {
    return (
      <div>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App">
        <br></br>
        <br></br>
        <div className="maincard">
          <div className="cardtitle">
            CDK Global 
          </div>
          <div className="cardorg">
            Smart Communication
          </div>
          <div className="cardlogosmall">
            <i class="fa fa-code"></i>
          </div>
          <div id='test'>
            <div className="cardlogo">
              {/* <img src={logo} /> */}
            </div>
          </div>
          <div className="cardcode">
            RA25
          </div>          
          <div className="cardline"></div>
          <div className="carddata">
            Better and Faster emergency care during accidents and vehicle impact. 
            <div className="cardshare">
            <i class="material-icons">
share
</i>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
