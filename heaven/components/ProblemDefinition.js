import React from 'react'
import Center from 'react-center'
import CommentsContainer from './CommentsContainer'
import LabelsBox from './LabelsBox'
import {Grid, Container, Box, Paper} from '@material-ui/core'

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
                    <Grid item md={7} style={{marginBottom: '150px'}}>
                        <div style={{width: '80%', margin:'auto'}}>
                        <div style={{whiteSpace: 'pre-wrap'}}>
                            {this.props.problem.Description}
                            </div>
                        </div>
                        <Box boxShadow={3} style={{
                            minHeight: '200px',
                            background:'white',
                            width: '90%', margin:'auto', marginTop: '50px',
                        }}><div style={{width:'100%'}}>
                            <CommentsContainer psid={this.props.problem.Number}/>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item md={5}>

                        <Paper style={{minHeight: '400px', transform:'translate(0, -100px)', background:'white', wordBreak: 'break-all'}} >
                            
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
                            
                        </Paper>

                        <LabelsBox />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}