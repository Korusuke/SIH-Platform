import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NoiceBanner from "../../components/NoiceBanner";
import ProblemDefinition from "../../components/ProblemDefinition";

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
            theme: 'light'
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
    }

    render() {
        let customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == 'light' ? 'light' : 'dark',
            },
        });
        let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;
        return (
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
                    problem={this.props.problem}
                    url={envvar.REACT_APP_SERVER_URL}
                />
                </div>
                <Footer />
                </div>
            </ThemeProvider>
        );
    }
}

ProblemPage.getInitialProps = async function(context) {
    const res = await fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {
        headers: {
            origin: "google.com"
        }
    });
    const data = await res.json();

    //console.log(data);
    const { Number } = context.query;
    return {
        problem: data.filter(obj => obj["Number"] === Number)[0]
    };
};
