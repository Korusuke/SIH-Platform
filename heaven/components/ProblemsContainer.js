import React from 'react'

import { Grid, Paper,  Box, Container, CardActions} from '@material-ui/core';

import ProblemCard from './ProblemCard'


import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

export default class ProblemsContainer extends React.Component
{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            offset: 0,

        }

        console.log(this.props.cards.length);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(offset) {
        this.setState({ offset });
    }

 
    render(){
        console.log(this.props.allLabels)
        let arr = this.props.cards.map((card)=>(
        <Grid  item xs={12}  md={6} style={{padding:'10px'}}>
            <ProblemCard card={card} url={this.props.url} labels={this.props.allLabels[card.Number] || []} labelLoading={this.props.labelLoading}/>
        </Grid>
        ))

        let arrs = arr.slice(this.state.offset, this.state.offset+10)



    return (
        <Container style={{ paddingTop: '50px' }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Pagination
                    limit={10}
                    offset={this.state.offset}
                    total={arr.length}
                    onClick={(e, offset) => this.handleClick(offset)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'}}
                                />
            </MuiThemeProvider>
            <Grid container >
                {arrs}
            </Grid>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Pagination
                limit={10}
                offset={this.state.offset}
                total={arr.length}
                    onClick={(e, offset) => this.handleClick(offset)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
            </MuiThemeProvider>
        </Container>
            )
    }
}