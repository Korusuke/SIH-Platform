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

export default class SubmissionCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            category: '',
            description: '',
            company: '',
            number: '',
            title: '',
            domain: '',
            link: '',
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
        <Container style={{ margin: "30px auto" }}>
            <Center>
                Here you can see the selected problem statement and the
                submission made by your team leader. <br />
                If you have something else in mind, express it to your team
                leader before the submission deadline.
            </Center>
            <Paper style={{ padding: "32px", margin: "30px auto" }}>
                <Grid container direction="row" spacing={3}>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Category"
                            value={this.state.submission.category}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Company"
                            value={this.state.submission.company}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Domain"
                            value={this.state.submission.domain}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={2} xs={4}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Number"
                            value={this.state.submission.number}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={10} xs={8}>
                        <TextField
                            fullWidth={true}
                            disabled={true}
                            id="outlined-required"
                            label="Title"
                            value={this.state.submission.title}
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
                                this.state.submission.description
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
                            value={this.state.submission.link}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
        );    
    }
}
