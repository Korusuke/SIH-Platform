import React from 'react'
import NoiceBanner from '../components/NoiceBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Filter from '../components/Filter'
import fetch from 'isomorphic-unfetch';
import ProblemsContainer from '../components/ProblemsContainer'
import Head from 'next/head'

import envvar from '../env'

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
      else if(hardware)
        found = this.props.problems.filter(obj => obj.Category == 'Hardware' )
      else
        found = this.props.problems.filter(obj => false )

      console.log('ORG', org)
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
      // console.log(this.state.found.length)
      return (
        <div>
          <Head>
            <title>Problem Statements</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>
          <Header />
          <NoiceBanner text="Problem Statements" backgroundImage={"/assets/images/banner.jpg"} />
          <Filter filter={this.applyFilter} cards={this.props.problems} />
          <ProblemsContainer cards={this.state.found} url={envvar.REACT_APP_SERVER_URL}/>
          {/* <Footer/> */}
      </div>
      );
    }
  }

  Problems.getInitialProps = async function() {
    const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`);
    const data = await res.json();

    //console.log(data);

    return {
      problems: data
    };
  };