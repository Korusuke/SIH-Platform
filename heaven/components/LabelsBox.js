import React from 'react'
import {Paper, TextField, Chip, Grid, Button} from '@material-ui/core'

import { TwitterPicker } from 'react-color';
import Center from 'react-center'
import envvar from '../env'

const fontColor = function (hex) {
    let col = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(col[1], 16) / 255.0, g = parseInt(col[2], 16) / 255.0, b = parseInt(col[3], 16) / 255.0
    let luminance = 0.299 * r + 0.587 * g + 0.114 * b
    r = luminance > 0.5 ? 0 : 255
    return "#" + ((1 << 24) + (r << 16) + (r << 8) + r).toString(16).slice(1);

}
export default class LabelsBox extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            labels : [],
            addlabel: "",
            showPicker: false,
            pickerColor: "#ff0000",
            updating:""
        }

        this.handleDelete =this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePickerChange = this.handlePickerChange.bind(this)
        this.addLabel = this.addLabel.bind(this)
        this.setLabels = this.setLabels.bind(this)

    }

    handlePickerChange(color, event)
    {
        console.log(color)
        this.setState({
            pickerColor: color.hex
        })
    }

    handleChange(event)
    {
        let {name, value} = event.target
        this.setState(
            {
                [name]: value
            }
        )

        if(name == "addlabel")
        {
            this.setState({
                showPicker: value?true:false
            })
        }
    }

    setLabels() {

    }

    handleDelete(name,color)
    {
        const { labels } = this.state;
        this.setState({ labels: labels.filter((e) => (e.label != name || e.color != color)) })
        try {
            console.log('Deleting...');
            fetch(`${envvar.REACT_APP_SERVER_URL}/ps/labels/`
                ,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        psid: this.props.psid,
                        label: name,
                        color: color
                    })
                }
            ).then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        } catch (e) {
            console.log(e);
        }
    }

    addLabel() {
        let label = this.state.addlabel;
        let colo = this.state.pickerColor;
        console.log(label, colo);
        const { labels } = this.state;
        labels.push({
            label: label,
            color: colo
        });
        this.setState({ labels: labels });
        try {
            fetch(`${envvar.REACT_APP_SERVER_URL}/ps/labels/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        psid: this.props.psid,
                        label: label,
                        color: colo
                    })
                }
            ).then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        try {
            console.log(this.state.labels);
            fetch(`${envvar.REACT_APP_SERVER_URL}/ps/labels/?psid=${this.props.psid}`
                ,
                {
                   credentials: "include",
                }
            ).then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        labels: data,

                    });
                    console.log(this.state.labels);
                })

        } catch (e) {
            console.log(e)
        }


    }


    render(){


        //console.log(this.state.labels)
        let labelsJSX;
        if(this.state.labels != []){
            labelsJSX = this.state.labels.map(
                e=> <Grid item >
                    <Chip style={{ background: e.color, color: fontColor(e.color) }} onDelete={() => { this.handleDelete(e.label,e.color) }} label={e.label}/>
                </Grid>
            )
        }
        //console.log(this.state.showPicker)
        return (
            <div>
                <Paper style={{minHeight:'100px', padding: '10px'}}>
                    <Grid container direction="row" spacing={2}>
                        {labelsJSX}

                    </Grid>
                    <br/>
                    <div style={{height: '30px', width: '100%'}}>
                    {
                        this.state.showPicker?
                        <Center>
                            {
                                this.state.pickerColor ?
                                <Chip style={ {background:this.state.pickerColor, color:fontColor(this.state.pickerColor)}} label={this.state.addlabel}/>
                                :
                                <Chip color="primary" label={this.state.addlabel} />
                            }

                        </Center>
                        :
                        null
                    }
                    </div>
                    <br/>
                    <Grid container direction="row">
                    <Grid item xs={8} md={10}>
                    <TextField
                        fullWidth={true}
                        id="outlined"
                        name="addlabel"
                        label="Add Label"
                        variant="outlined"
                        value={this.state.addlabel}
                        onChange={this.handleChange}

                    />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Center style={{height: '100%'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addLabel}
                            disabled={!this.state.showPicker}
                        >
                            {this.state.updating ? "Adding.." : "Add"}
                        </Button>
                        </Center>
                    </Grid>
                    </Grid>

                    {this.state.showPicker ?
                    < TwitterPicker onChange={this.handlePickerChange}/>
                    : null}

                    <br/>

                    <div style={{
                        padding: '10px',
                    }}>Labels can be used to quickly filter projects based on custom tags and to compare projects for final shortlisting.<br/><br/> For e.g you can add labels like "doable", "easy", "boring", etc to help you and your team narrow down your search and pick a problem statement <br/><br/>Your Labels are only visible to you and your team ;)</div>
                </Paper>
            </div>
        )
    }
}