import React from "react";

import {
    Paper,
    Grid,
    Container,
    TextField,
} from "@material-ui/core";
import Center from "react-center";
import Snackbar from "./snackbar";

import envvar from "../env";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";

import * as Showdown from "showdown";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default class SubmissionCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
        <div>
            
            <Paper style={{ padding: "32px", margin: "30px auto" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Category"
                            value={this.props.submission.category}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Company"
                            value={this.props.submission.company}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Domain"
                            value={this.props.submission.domain}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={2} xs={4}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Number"
                            value={this.props.submission.number}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={10} xs={8}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Title"
                            value={this.props.submission.title}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <div style={{ width: "100%", margin: "32px auto" }}>
                    <div
                        style={{
                            border: "1px solid rgba(128, 128, 128, 0.5)",
                            borderRadius: "4px",
                            padding: "5px",
                            overflow: "auto",
                            minHeight: '30px',
                            maxHeight: '200px'
                        }}
                    >
                        {ReactHtmlParser(
                            converter.makeHtml(
                                this.props.submission.description
                            )
                        )}
                    </div>
                </div>
                <Grid container direction="row" spacing={3}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Link"
                            value={this.props.submission.link}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
        );    
    }
}
