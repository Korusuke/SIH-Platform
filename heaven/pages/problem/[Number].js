import { useRouter } from 'next/router';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NoiceBanner from '../../components/NoiceBanner'
import ProblemDefinition from '../../components/ProblemDefinition'

import '../../styles/index.css'
import fetch from 'isomorphic-unfetch';

import envvar from '../../env'

import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function ProblemPage(props) {
  const router = useRouter();

  return (
    <div>
      <Header loggedin={true}/>
      <NoiceBanner text="Problem Statements" backgroundImage={"/assets/images/banner.jpg"}/>
      <ProblemDefinition problem={props.problem} url={envvar.REACT_APP_SERVER_URL}/>
      <Footer/>
    </div>
  );
}

ProblemPage.getInitialProps = async function(context) {
    const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {headers:{
      'origin':'google.com'
    }});
    const data = await res.json();

    //console.log(data);
  const { Number } = context.query
    return {
      problem: data.filter(obj => obj['Number'] === Number)[0]
    };
  };