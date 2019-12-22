import React from 'react'
import NoiceBanner from '../components/NoiceBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import '../styles/index.css'
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Chaand from '../components/chaand';
import Filter from '../components/Filter'
import fetch from 'isomorphic-unfetch';
import ProblemsContainer from '../components/ProblemsContainer'
import Head from 'next/head'

export default class Problems extends React.Component {
    // console.log(props.problems);
    theme = {
      dark: {
          background: '#121212',
          text: '#FFFFFF',
      },
      light: {
          background: '#FCFCFC',
          text: '#000000',
      }
  }
    
    constructor(props)
    {
      super()
      this.props = props
      //console.log(this.props)
      this.state = {
        theme:'light',
        found : this.props.problems.filter(obj => true)
      }
      this.handler = this.handler.bind(this)
      this.applyFilter = this.applyFilter.bind(this);
    }

    filterIt(ar, searchKey) {
      return ar.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchKey.toLowerCase())));
    }
    handler() {
      if (this.state.theme == 'light') {
          this.setState({
              theme: 'dark'
          })
      } else {
          this.setState({
              theme: 'light'
          })
      }
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
      const customtheme = createMuiTheme({
        palette: {
            type: this.state.theme == 'light' ? 'light' : 'dark',
        },
    });
    let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;

      // console.log(this.state.found.length)
      return (
        <ThemeProvider theme={customtheme}>
          <div>
          <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
        <div id="content-wrap" style={{ backgroundColor: `${curtheme.background}`, color: `${curtheme.text}` }}>
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
              <SearchBar filter={this.applyFilter} cards={this.props.problems} />
              <ProblemsContainer cards={this.state.found} />
              {/* <Footer/> */}
          </div>
        </div>
          </ThemeProvider>
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