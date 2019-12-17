import { useRouter } from 'next/router';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NoiceBanner from '../../components/NoiceBanner'
import ProblemDefinition from '../../components/ProblemDefinition'

import '../../styles/index.css'
import fetch from 'isomorphic-unfetch';

export default function ProblemPage(props) {
  const router = useRouter();

  return (
    <div>
      <Header />
      <NoiceBanner text="Problem Statements"/>
      <ProblemDefinition problem={props.problem}/>
    </div>
  );
}

ProblemPage.getInitialProps = async function(context) {
    const res = await fetch('https://cors-anywhere.herokuapp.com/http://possessive-bait.surge.sh/ps.json', {headers:{
      'origin':'google.com'
    }});
    const data = await res.json();
  
    //console.log(data);
    const {id} = context.query
    return {
      problem: data.filter(obj => obj['_id'] === id)[0]
    };
  };