import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NoiceBanner from "../../components/NoiceBanner";
import ProblemDefinition from "../../components/ProblemDefinition";
import Head from "next/head";
import "../../styles/index.css";
import fetch from "isomorphic-unfetch";
import Chaand from '../../components/chaand';

import { ThemeProvider } from '@material-ui/core'

import envvar from "../../env";

import {
    useTheme,
    createMuiTheme
} from "@material-ui/core";

export default class ProblemPage extends React.Component {

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


    constructor(props) {
        super(props)
        this.state = {
            theme: 'light',
            dataPresent: true,
            problem: {}
        }
        this.handler = this.handler.bind(this)
    }

    // componentDidMount()
    // {
    //     if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
    //     {
    //         this.setState({theme:localStorage.getItem('siteTheme')})
    //     }
    // }


    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        } else {
            this.setState({
                theme: 'light'
            }, ()=>{
                localStorage.setItem('siteTheme', 'dark')
            })
        }
    }

    componentDidMount()
    {
        if(localStorage.getItem('siteTheme') && this.state.theme != localStorage.getItem('siteTheme') )
        {
            this.setState({theme:localStorage.getItem('siteTheme')})
        }

        if(localStorage.getItem('problems'))
        {
            let  numberPattern = /\d+/g;

            let problems = JSON.parse(localStorage.getItem('problems'))
            let problem = problems.filter(obj => obj["Number"] == this.props.Num)[0]

            this.setState({
                problem: problem,
                dataPresent: true
            })
        }
        else{
            fetch(`${envvar.REACT_APP_SERVER_URL}/ps`)
            .then(res => res.json())
            .then((data) => {
                let  numberPattern = /\d+/g;

                let problem = data.filter(obj => obj["Number"] == this.props.Num)[0]

                this.setState({
                    problem: problem,
                    dataPresent: true
                })
            })

            //console.log(data);

            // return {
            //     problem: data.filter(obj => obj["Number"] == Number)[0]
            // };
        }
    }

    render() {
        let customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == 'light' ? 'light' : 'dark',
            },
        });
        let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;
      return (
        <div>
        <Head>
          <title>SIH - KJSCE</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
            <ThemeProvider theme={customtheme}>
            <div style={{minHeight:'100vh', background: curtheme.background, color: curtheme.text}} >
                <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
                <div id="content-wrap" style={{ backgroundColor: `${curtheme.background}`, color: `${curtheme.text}` }}>
                <Header loggedin={true} />
                <NoiceBanner
                    text="Problem Statements"
                    backgroundImage={"/assets/images/banner.jpg"}
                />
                <ProblemDefinition
                    num={this.props.Num}
                    problem={this.state.problem}
                    dataPresent = {this.state.dataPresent}
                    url={envvar.REACT_APP_SERVER_URL}
                />
                </div>
                <Footer />
                </div>
          </ThemeProvider>
        </div>
        );
    }
}

ProblemPage.getInitialProps = async function(context) {

    // const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {
    //     headers: {
    //         origin: "google.com"
    //     }
    // });
    // const data = await res.json();

    // //console.log(data);
    const Numb = context.query.Number;
    return {
        Num: Numb
    }
//     return {
//         problem: data.filter(obj => obj["Number"] === Number)[0]
//     };
// };
}
