import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Grid,
    Container,
    TextField,
    Slider,
    Typography,
    Button
} from "@material-ui/core";
import Center from "react-center";
import Snackbar from "./snackbar";

import envvar from "../env";
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2
} from "react-html-parser";

const PrettoSlider = withStyles({
    root: {
        color: "#caa5e6",
        height: 8
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus,&:hover,&$active": {
            boxShadow: "inherit"
        }
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)"
    },
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
})(Slider);

export default class ReviewScores extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            novelty: this.props.scores.novelty || 5,
            feasibility: this.props.scores.feasibility || 5,
            complexity: this.props.scores.complexity || 5,
            methodology: this.props.scores.methodology || 5,
            tech_stack: this.props.scores.tech_stack || 5,
            team_comp: this.props.scores.team_comp || 5,
            presentation: this.props.scores.presentation || 5,
            remarks: this.props.scores.remarks || "",
            submitted: false,
            snack: false
        };
        this.snackcontent = "";
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    onSliderChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    onChange(event) {
        let { name, value, type } = event.target;
        if (type == "number" && (value < 0 || value > 10)) return;
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        this.setState({
            submitted: true
        });
        console.log({
            novelty: this.state.novelty,
            feasibility: this.state.feasibility,
            complexity: this.state.complexity,
            methodology: this.state.methodology,
            tech_stack: this.state.tech_stack,
            team_comp: this.state.team_comp,
            presentation: this.state.presentation,
            remarks: this.state.remarks,
            teamId: this.props.teamId
        });
        fetch(`${envvar.REACT_APP_SERVER_URL}/admin/add_score`, {
            credentials: "include",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                scores: {
                    novelty: this.state.novelty,
                    feasibility: this.state.feasibility,
                    complexity: this.state.complexity,
                    methodology: this.state.methodology,
                    tech_stack: this.state.tech_stack,
                    team_comp: this.state.team_comp,
                    presentation: this.state.presentation,
                    remarks: this.state.remarks
                    
                },
                teamId: this.props.teamId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                this.snackcontent = (
                    <Snackbar type={data.status} msg={data.msg} />
                );
                this.setState({ submitted:false, snack: true });
                setTimeout(() => {
                    this.setState({ snack: false });
                }, 3000);
            })
            .catch(e => {
                console.log(e);
                this.snackcontent = (
                    <Snackbar type="error" msg="Something went wrong" />
                );
                this.setState({ submitted:false, snack: true });
                setTimeout(() => {
                    this.setState({ snack: false });
                }, 3000);
            });
    }

    render() {
        return (
            <div>
                {this.state.snack ? this.snackcontent : null}
                <Paper style={{ padding: "32px", margin: "30px auto" }}>
                    <Center>
                        <Typography variant="h6" gutterBottom>
                            Scores
                        </Typography>
                    </Center>
                    <div style={{ width: "80%", margin: "auto" }}>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Novelty
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="novelty"
                                    onChange={(event, value) => {
                                        this.onSliderChange("novelty", value);
                                    }}
                                    value={this.state.novelty}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="novelty"
                                        value={this.state.novelty}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Feasibility
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="feasibility"
                                    onChange={(event, value) => {
                                        this.onSliderChange(
                                            "feasibility",
                                            value
                                        );
                                    }}
                                    value={this.state.feasibility}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="feasibility"
                                        value={this.state.feasibility}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Complexity
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="complexity"
                                    onChange={(event, value) => {
                                        this.onSliderChange(
                                            "complexity",
                                            value
                                        );
                                    }}
                                    value={this.state.complexity}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="complexity"
                                        value={this.state.complexity}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Methodology
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="methodology"
                                    onChange={(event, value) => {
                                        this.onSliderChange(
                                            "methodology",
                                            value
                                        );
                                    }}
                                    value={this.state.methodology}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="methodology"
                                        value={this.state.methodology}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    TechStack
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="tech_stack"
                                    onChange={(event, value) => {
                                        this.onSliderChange(
                                            "tech_stack",
                                            value
                                        );
                                    }}
                                    value={this.state.tech_stack}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="tech_stack"
                                        value={this.state.tech_stack}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Team Composition
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="team_comp"
                                    onChange={(event, value) => {
                                        this.onSliderChange("team_comp", value);
                                    }}
                                    value={this.state.team_comp}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="team_comp"
                                        value={this.state.team_comp}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography variant="subtitle1">
                                    Presentation
                                </Typography>
                                <PrettoSlider
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={5}
                                    max={10}
                                    min={0}
                                    step={1}
                                    marks={true}
                                    name="presentation"
                                    onChange={(event, value) => {
                                        this.onSliderChange(
                                            "presentation",
                                            value
                                        );
                                    }}
                                    value={this.state.presentation}
                                />
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Center style={{ height: "100%" }}>
                                    <TextField
                                        fullWidth={true}
                                        name="presentation"
                                        value={this.state.presentation}
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="1"
                                        variant="outlined"
                                        onChange={this.onChange}
                                    />
                                </Center>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth={true}
                                    name="remarks"
                                    value={this.state.remarks}
                                    type="text"
                                    variant="outlined"
                                    label="Remarks"
                                    onChange={this.onChange}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Center>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    color: "#ffffff",
                                    width: "100%",
                                    margin: "1%"
                                }}
                                onClick={this.onSubmit}
                                disabled={this.state.submitted}
                            >
                                Submit Review
                            </Button>
                        </Center>
                    </div>
                </Paper>
            </div>
        );
    }
}
