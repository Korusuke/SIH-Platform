import React from 'react'
import NoiceBanner from '../components/NoiceBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import '../styles/index.css'
import fetch from 'isomorphic-unfetch';
import ProblemsContainer from '../components/ProblemsContainer'

export default class Problems extends React.Component {
    // console.log(props.problems);
    constructor(props)
    {
      super()
      this.props = props
      //console.log(this.props)
      this.state = {
        found : this.props.problems.filter(obj => true)
      }

      this.applyFilter = this.applyFilter.bind(this);
    }

    filterIt(ar, searchKey) {
      return ar.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchKey.toLowerCase())));
    }
  applyFilter(stateInput)
  {
      let found

      let {software, hardware, ideabucket, searchfilter, org} = stateInput;

      console.log(stateInput)

      if(software && hardware)
        found = this.props.problems.filter(obj => obj.Category == 'Software' || obj.Category=='Hardware')
      else if (software)
        found = this.props.problems.filter(obj => obj.Category == 'Software' )
      else 
        found = this.props.problems.filter(obj => obj.Category == 'Hardware' )

      if(org)
        found = found.filter(obj => obj.Company == org )

      if(ideabucket)
        found = found.filter(obj => obj.Domain == ideabucket )
      

     
      if(searchfilter)
          found = this.filterIt(found, searchfilter)

      


      this.setState(
        {
          found: found
        }
      )
  }

    render(){
      console.log(this.state.found.length)
      return (
          <div>
              <Header />
              <NoiceBanner text="Problem Statements"/>
              <SearchBar filter={this.applyFilter} cards={this.props.problems} />
              <ProblemsContainer cards={this.state.found} />
              {/* <Footer/> */}
          </div>
      );
    }
  }

  Problems.getInitialProps = async function() {
    const res = await fetch('https://cors-anywhere.herokuapp.com/http://possessive-bait.surge.sh/ps.json', {headers:{
      'origin':'google.com'
    }});
    const data = await res.json();
  
    //console.log(data);
  
    return {
      problems: data
    };
  };