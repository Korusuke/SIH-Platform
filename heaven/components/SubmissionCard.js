import React from "react";

import {
    Paper,
    Grid,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    InputAdornment
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Center from "react-center";
import ReactMde from "react-mde";
import axios from "axios";
import Snackbar from "./snackbar";
import Editor from "../components/editor";

import envvar from "../env";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
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
        this.state = {
            category: [],
            domain: [],
            company: [],
            title: [],
            number: [],
            submission: {
                category: "",
                domain: "",
                company: "",
                number: "",
                title: "",
                description: "",
                link: ""
            },
            role: "",
            selected: "none",
            ps: [],
            filtered: [],
            snack: false
        };
        this.snackcontent = "";
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setFilters(option = "") {
        let ps = this.state.filtered;
        let category = [];
        let company = [];
        let domain = [];
        let title = [];
        let number = [];
        for (var i in ps) {
            // console.log(ps[i]);
            category.push(ps[i].Category);
            company.push(ps[i].Company);
            domain.push(ps[i].Domain);
            title.push(ps[i].Title);
            number.push(ps[i].Number);
        }
        // console.log(option)
        switch (option) {
            case "category":
                category = this.state[option];
                break;
            case "company":
                company = this.state[option];
                break;
            case "domain":
                domain = this.state[option];
                break;
            case "title":
                title = this.state[option];
                break;
            case "number":
                number = this.state[option];
                break;
            default:
                break;
        }
        // console.log(number);
        category = [...new Set(category)];
        company = [...new Set(company)];
        domain = [...new Set(domain)];
        title = [...new Set(title)];
        number = [...new Set(number)];
        this.setState({
            category,
            company,
            domain,
            title,
            number
        });
        let submission = this.state.submission;
        if (category.length == 1) {
            submission.category = category[0];
        }
        if (domain.length == 1) {
            submission.domain = domain[0];
        }
        if (company.length == 1) {
            submission.company = company[0];
        }
        if (title.length == 1) {
            submission.title = title[0];
        }
        if (number.length == 1) {
            submission.number = number[0];
        }
        this.setState({
            submission
        });
    }

    clearFilters() {
        this.setState(
            {
                filtered: this.state.ps,
                category: [],
                domain: [],
                company: [],
                title: [],
                number: [],
                submission: {
                    category: "",
                    domain: "",
                    company: "",
                    number: "",
                    title: "",
                    description: "",
                    link: ""
                }
            },
            () => {
                this.setFilters();
            }
        );
    }


    componentDidMount() {
        let url = window.location.href.split("/");
        let psid = "";
        if (url.length == 5) psid = url[4];
        fetch(`${envvar.REACT_APP_SERVER_URL}/user/leader`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'success') {
                    this.setState({
                        role: data.role
                    }, () => {
                        if (this.state.role != 'leader' && psid != "") {
                            location.href = '/submission';
                            return
                        }
                    })
                    console.log(this.state);
                }
            })
        fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                let filtered;
                if (psid != "")
                    for (var i in data) {
                        if (data[i].Number == psid) {
                            filtered = [data[i]];
                            break;
                        }
                    }
                else filtered = data;
                this.setState({
                    ps: data,
                    filtered: filtered
                });
                this.setFilters();
                // console.log(this.state);
            })
            .catch(e => console.log(e, "asd"));



        if (psid == "") {
            fetch(`${envvar.REACT_APP_SERVER_URL}/submission`, {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    let { status, submission, role } = data;
                    if (status == "success") {
                        for (var i in this.state.submission)
                            submission[i] = submission[i] || "";
                        this.setState({
                            submission,
                            selected: "block",
                            role
                        });
                    }
                });
        } else {
            this.snackcontent = (
                <Snackbar
                    type="error"
                    msg="Your previous submission would be overwritten!"
                />
            );
            this.setState({ snack: true });
            setTimeout(() => {
                this.setState({ snack: false });
            }, 3000);

        }
        ValidatorForm.addValidationRule("isLink", value => {
            // console.log('validating roll');
            var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            var regex = new RegExp(expression);
            return value.match(regex);
        });


    }

    handleSelect(event) {
        let filters = [];
        ["company", "category", "domain", "number", "title"].forEach(j => {
            if (this.state[j].length == 1) {
                filters.push(j);
            }
        });
        if (filters.length >= 4)
            this.setState({
                selected: "block"
            });
        // console.log(this.state);
    }

    handleChange(event) {
        let { name, type, value, disabled } = event.target;
        let submission = this.state.submission;
        submission[name] = value;
        let select;
        let ps;

        let filtered = [];
        let filters = [];
        ["company", "category", "domain", "number", "title"].forEach(j => {
            if (this.state[j].length != 1) {
                filters.push(j);
            }
        });
        // console.log(filters)
        if (filters.length == 1) ps = this.state.ps;
        else ps = this.state.filtered;
        // console.log(ps)

        for (var i in ps) {
            select = true;
            for (var key in this.state.submission) {
                if (filters.includes(key))
                    if (
                        this.state.submission[key] != "" &&
                        this.state.submission[key] !=
                        ps[i][key[0].toUpperCase() + key.substr(1)]
                    ) {
                        select = false;
                        break;
                    }
            }
            if (select) filtered.push(ps[i]);
        }
        this.setState(
            {
                submission: submission,
                filtered: filtered
            },
            () => {
                this.setFilters(name);
            }
        );
    }

    handleChange2(value) {
        // let { name, type, value } = event.target;
        let submission = this.state.submission;
        if (value.length <= 5000) {
            submission['description'] = value;
            this.setState({
                submission: submission
            })
        }
        // console.log(this.state.submission.description);
    }

    handleChange3(event) {
        let { name, type, value } = event.target;
        let submission = this.state.submission;
        submission[name] = value;
        this.setState({
            submission: submission
        });
        // console.log(this.state.submission.description);
    }

    onSubmit() {
        let submission = this.state.submission;
        console.log(submission);
        axios.defaults.withCredentials = true;
        axios
            .post(`${envvar.REACT_APP_SERVER_URL}/submission/`, {
                submission
            })
            .then(res => {
                if (res.status == 200) {
                    console.log(res);
                    this.snackcontent = (
                        <Snackbar type={res.data.status} msg={res.data.msg} />
                    );
                    this.setState({ snack: true });
                    setTimeout(() => {
                        this.setState({ snack: false });
                    }, 3000);
                } else {
                    this.snackcontent = (
                        <Snackbar type="error" msg="Uh ho! Error Occured" />
                    );
                    this.setState({ snack: true });
                    setTimeout(() => {
                        this.setState({ snack: false });
                    }, 3000);
                }
            });
    }

    handleFocus(event) {
        console.log(event.target.value);
    }

    handleBlur(event) {
        let submission = this.state.submission;
        submission.description = renderHTML(event.target.value);
        console.log(submission.description);
        this.setState({
            submission
        });
    }

    render() {
        let leaderView = (
            <Container style={{ margin: "30px auto" }}>
                <Paper style={{ padding: "32px" }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item md={4} xs={6}>
                            <FormControl
                                variant="outlined"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    label="Category"
                                    labelWidth="65"
                                    name="category"
                                    required
                                    value={this.state.submission.category}
                                    onChange={this.handleChange}
                                    autoWidth
                                    disabled={this.state.category.length == 1}
                                >
                                    {this.state.category.map(e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <FormControl
                                variant="outlined"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <InputLabel id="company">Company</InputLabel>
                                <Select
                                    labelId="company"
                                    label="Company"
                                    labelWidth="65"
                                    name="company"
                                    required
                                    value={this.state.submission.company}
                                    onChange={this.handleChange}
                                    autoWidth
                                    disabled={this.state.company.length == 1}
                                >
                                    {this.state.company.map(e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl
                                variant="outlined"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <InputLabel id="domain">Domain</InputLabel>
                                <Select
                                    labelId="domain"
                                    label="Domain"
                                    labelWidth="60"
                                    name="domain"
                                    required
                                    value={this.state.submission.domain}
                                    onChange={this.handleChange}
                                    autoWidth
                                    disabled={this.state.domain.length == 1}
                                >
                                    {this.state.domain.map(e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item md={2} xs={4}>
                            <FormControl
                                variant="outlined"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <InputLabel id="number">Number</InputLabel>
                                <Select
                                    labelId="number"
                                    label="Number"
                                    labelWidth="60"
                                    name="number"
                                    required
                                    value={this.state.submission.number}
                                    onChange={this.handleChange}
                                    autoWidth
                                    disabled={this.state.number.length == 1}
                                >
                                    {this.state.number.map(e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={10} xs={8}>
                            <FormControl
                                variant="outlined"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <InputLabel id="title">Title</InputLabel>
                                <Select
                                    labelId="title"
                                    label="Title"
                                    labelWidth="50"
                                    name="title"
                                    required
                                    value={this.state.submission.title}
                                    onChange={this.handleChange}
                                    autoWidth
                                    disabled={this.state.title.length == 1}
                                >
                                    {this.state.title.map(e => (
                                        <MenuItem key={e} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Center>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                            style={{ marginTop: "20px" }}
                        >
                            <Grid item md={4} xs={10}>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#3c00ff",
                                        color: "#ffffff",
                                        width: "100%"
                                    }}
                                    onClick={this.handleSelect}
                                >
                                    Select
                                </Button>
                            </Grid>
                            <Grid item md={4} xs={10}>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#ff0000",
                                        color: "#ffffff",
                                        width: "100%"
                                    }}
                                    onClick={this.clearFilters}
                                >
                                    Clear Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Center>
                </Paper>
                <Paper
                    style={{
                        marginTop: "40px",
                        padding: "20px",
                        display: `${this.state.selected}`
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item md={11} xs={12}>
                            {this.state.submission.description.length}/5000 characters | Markdown supported
                        </Grid>
                        <Grid
                            item
                            md={11}
                            xs={12}
                            onClick={() => this.setState({ editing: true })}
                        >
                            <Editor
                                onChange={this.handleChange2}
                                value={this.state.submission.description}
                            />
                        </Grid>
                        <Grid item container md={11} xs={12}>
                        <ValidatorForm
                                ref="form"
                                onSubmit={this.onSubmit}
                                onError={errors => console.log(errors)}
                                style={{ width: "100%" }}
                            >
                        <Grid item md={12} xs={12}>

                                <TextValidator
                                    required
                                    name="link"
                                    id="outlined-full-width"
                                    label="Submission Link"
                                    variant="outlined"
                                    validators={["required", "isLink"]}
                                    errorMessages={[
                                        "Please enter Submission Link",
                                        "Please enter valid Submission Link"
                                    ]}
                                    value={this.state.submission.link}
                                    onChange={this.handleChange3}
                                    style={{ width: '100%' }}
                                />


                        </Grid>
                            <Center>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#3c00ff",
                                        color: "#ffffff",
                                        width: "50%",
                                        margin: "1%"
                                    }}
                                        type='submit'
                                >
                                    Submit
                            </Button>
                            </Center>
                            </ValidatorForm>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        );

        let memberView = (
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
        return (
            <div>
                {this.state.snack ? this.snackcontent : null}
                {this.state.role == "leader" ? leaderView : memberView}
            </div>
        );
    }
}
