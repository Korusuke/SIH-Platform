import React from 'react'
import Center from 'react-center'
import {Grid, Container, Box, ButtonBase} from '@material-ui/core'

export default class ProblemDefinition extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {

        }
    }

    render()
    {
        return (
            <Container maxWidth="xl" style={{paddingTop: '20px'}}>
                
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <Grid container direction="row">
                    <Grid item md={7}>
                        <div style={{width: '80%', margin:'auto'}}>
                        <div style={{whiteSpace: 'pre-wrap'}}>
                            {this.props.problem.Description}
                            </div>
                        </div>
                        <Box boxShadow={3} style={{
                            heigth: '200px',
                            background:'white',
                            width: '80%', margin:'auto', marginTop: '50px',
                        }}><ButtonBase style={{width:'100%'}}>
                            <Center><h1>Comments</h1></Center>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item md={5}>

                        <Box style={{minHeight: '400px', transform:'translate(0, -100px)', background:'white'}} boxShadow={3}>
                            <ButtonBase style={{width:'100%'}}>
                            <div style={{
                                padding: '20px'
                            }}>
                                <div>
                                    <Center>
                                        <div style={{
                                            position: 'relative',
  
 
                                            border: '1px solid',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                          
                                            width: '100px',
                                            height: '100px',
                                        }}>
                                            <img src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png" style={{
                                                width: '100px',
                                                height: '100px',
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }} />
                                        </div>
                                    </Center>
                                </div>
                                <div className="rightDesc">
                                    Problem Code<br/>
                                    {this.props.problem.Number}
                                </div>
                                <div className="rightDesc">
                                    {this.props.problem.Category}<br/>
                                    {this.props.problem.Domain}
                                </div>
                                <div className="rightDesc">
                                    {
                                        this.props.problem.Youtube ? (<div>Youtube Link <br/><a href={this.props.problem.Youtube} >{this.props.problem.Youtube}</a></div>) :( <span>No Youtube Video Available</span> )  
                                    }
                                </div>
                                <div className="rightDesc">
                                {
                                        this.props.problem.DataSet ? (<div>DataSet Link <br/><a href={this.props.problem.DataSet} >{this.props.problem.DataSet}</a></div>) :( <span>No Dataset Available</span> )  
                                    }
                                </div>
                            </div>
                            </ButtonBase>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}