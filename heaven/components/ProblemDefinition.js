import React from 'react'
import Center from 'react-center'
import CommentsContainer from './CommentsContainer'
import LabelsBox from './LabelsBox'
import {Grid, Container, Box, Paper} from '@material-ui/core'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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
            <Container maxWidth="lg" style={{paddingTop: '20px'}}>

                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700&display=swap" />
                <Grid container direction="row" spacing={3}>
                    <Grid container item md={8} justify='center' style={{ marginBottom: '150px' }}>
                        <Grid item md={11}>
                            <div style={{margin:'auto'}}>
                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.props.dataPresent? ReactHtmlParser(this.props.problem.Description): null}
                                </div>
                            </div>
                            <Box boxShadow={2} style={{
                                minHeight: '200px',
                                margin: 'auto',
                                marginTop: '50px',
                            }}><div style={{width:'100%'}}>
                                <CommentsContainer psid={this.props.num}/>
                                </div>
                                </Box>
                        </Grid>
                    </Grid>
                    <Grid item md={4}>

                        <Paper style={{minHeight: '400px', transform:'translate(0, -100px)', wordBreak: 'break-all'}} >

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
                                            <img src={this.props.dataPresent ? (this.props.url + this.props.problem.Logo) : null} style={{
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
                                    <span style={{ fontWeight: 700, fontSize: 18 }}>Problem Code<br/></span>
                                    <span style={{fontWeight:400,fontSize:18}}>{this.props.num}</span>
                                </div>
                                <div className="rightDesc">
                                    <span style={{ fontWeight: 700, fontSize: 18 }}>{this.props.dataPresent ? this.props.problem.Category: null}</span><br/>
                                    <span style={{ fontWeight: 700, fontSize: 18 }}>{this.props.dataPresent ? this.props.problem.Domain : null}</span>
                                </div>
                                <div className="rightDesc">
                                    {this.props.dataPresent ?
                                        this.props.problem.Youtube ? (<div><span style={{ fontWeight: 700, fontSize: 18 }}>Youtube Link</span> <br /><span style={{ fontWeight: 400, fontSize: 16 }}><a href={this.props.problem.Youtube} >{this.props.problem.Youtube}</a></span></div>) : (<span style={{ fontWeight: 400, fontSize: 16 }}>No Youtube Video Available</span> )
                                    :
                                    null
                                    }
                                </div>
                                <div className="rightDesc">
                                {
                                    this.props.dataPresent ?
                                        this.props.problem.DataSet ? (<div><span style={{ fontWeight: 700, fontSize: 18 }}>DataSet Link</span> <br /><span style={{ fontWeight: 400, fontSize: 16 }}><a href={this.props.problem.DataSet} >{this.props.problem.DataSet}</a></span></div>) : (<span style={{ fontWeight: 400, fontSize: 16 }}>No Dataset Available</span> )
                                    :
                                    null
                                    }
                                </div>
                            </div>

                        </Paper>

                        <LabelsBox psid={this.props.num} />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}