import React from 'react'
import {Paper, TextField, Chip, Grid, Button} from '@material-ui/core'

import { TwitterPicker } from 'react-color';
import Center from 'react-center'
export default class LabelsBox extends React.Component{
    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            labels : [{
                label:"important",
                color:"#ffff00"
            }],
            addlabel: "",
            showPicker: false,
            pickerColor: "",
            updating:""
        }

        this.handleDelete =this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePickerChange = this.handlePickerChange.bind(this)
        

        
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

    handleDelete()
    {

    }


    
    render(){

        const fontColor = function(hex)
        {
            let col = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            let r = parseInt(col[1], 16)/255.0, g = parseInt(col[2], 16)/255.0, b = parseInt(col[3], 16)/255.0
            let luminance = 0.299 * r + 0.587 * g + 0.114 * b
            r = luminance > 0.5 ? 0: 255
            return "#" + ((1 << 24) + (r << 16) + (r << 8) + r).toString(16).slice(1);

        }
        //console.log(this.state.labels)
        let labelsJSX = this.state.labels.map(
            e=> <Grid item sm={6} md={4}>
                <Chip style={{background:e.color, color:fontColor(e.color)}} onDelete={this.handleDelete} label={e.label}/>
            </Grid>
        )
        //console.log(this.state.showPicker)
        return (
            <div>
                <Paper style={{minHeight:'100px', padding: '10px'}}>
                    <Grid container direction="row">
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
                    }}>Labels can be used to quickly filter projects based on custom tags and to compare projects for final shortlisting.</div>
                </Paper>
            </div>
        )
    }
}