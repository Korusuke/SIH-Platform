import React from 'react';

import { 
    Paper, 
    Grid, 
    Container, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button,
    TextField
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Center from 'react-center';

import envvar from '../env';

export default class SubmissionCard extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            'category': [],
            'domain': [],
            'company': [],
            'title': [],
            'number': [],
            'submission': {
                'category': '',
                'domain': '',
                'company': '',
                'number': '',
                'title': '',
                'description': '',
                'link': ''
            },
            'selected': 'display',
            'ps': [],
            'filtered': []
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setFilters() {
        let ps = this.state.filtered;
        let category = [];
        let company = [];
        let domain = [];
        let title = [];
        let number = [];
        for(var i in ps) {
            // console.log(ps[i]);
            category.push(ps[i].Category);
            company.push(ps[i].Company);
            domain.push(ps[i].Domain);
            title.push(ps[i].Title);
            number.push(ps[i].Number);
        }
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
        })
    }

    clearFilters() {
        this.setState({
            'filtered': this.state.ps,
            'category': [],
            'domain': [],
            'company': [],
            'title': [],
            'number': [],
            'submission': {
                'category': '',
                'domain': '',
                'company': '',
                'number': '',
                'title': '',
                'description': '',
                'link': ''
            }
        }, () => {this.setFilters();});
    }

    componentDidMount() {

        fetch(`${envvar.REACT_APP_SERVER_URL}/ps`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ps: data,
                    filtered: data
                })
                this.setFilters();
                console.log(this.state);
            })
            .catch(e => console.log(e, "asd"));
            
        ValidatorForm.addValidationRule('isLink', (value) => {
            // console.log('validating roll');
            let regexp = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
            + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";

            return new RegExp(regexp).test(value)

        });
    }

    handleSelect(event) {
        this.setState({
            selected: 'display'
        })
        console.log(this.state);
    }

    handleChange(event) {
        let { name, type, value } = event.target;
        let submission = this.state.submission;
        submission[name] = value;
        let select;
        let ps = this.state.ps;
        let filtered = [];
        for(var i in ps) {
            select = true;
            for(var key in this.state.submission) {
                // console.log(this.state.submission[key]!='', this.state.submission[key]!=ps[i][key[0].toUpperCase() + key.substr(1,)])
                if(this.state.submission[key]!='' && this.state.submission[key]!=ps[i][key[0].toUpperCase() + key.substr(1,)])
                    select = false;
            }
            if(select)
                filtered.push(ps[i]);
        }
        this.setState({
            submission: submission,
            filtered: filtered
        }, () => {this.setFilters();});
    }

    onSubmit() {
        console.log("Submit");
    }

    render() {
        return(
            <Container>
                <Paper style={{marginTop: '50px'}}>
                    <Grid container direction="row" justify="center"
                        alignItems="center" spacing={4}>
                        <Grid item md={3}>
                            <FormControl
                                    variant="outlined"
                                    style={{
                                        width:'100%'
                                    }}
                                >

                                <InputLabel id="category" >Category</InputLabel>
                                <Select
                                    labelId="category"
                                    label="Category"
                                    labelWidth="75"
                                    name="category"
                                    required
                                    value={this.state.submission.category}
                                    onChange={this.handleChange}
                                    autoWidth
                                >
                                    {this.state.category.map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl
                                    variant="outlined"
                                    style={{
                                        width:'100%'
                                    }}
                                >

                                <InputLabel id="company">Company</InputLabel>
                                <Select
                                    labelId="company"
                                    label="Company"
                                    labelWidth="75"
                                    name="company"
                                    required
                                    value={this.state.submission.company}
                                    onChange={this.handleChange}
                                    autoWidth
                                >
                                    {this.state.company.map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl
                                    variant="outlined"
                                    style={{
                                        width:'100%'
                                    }}
                                >

                                <InputLabel id="domain" >Domain</InputLabel>
                                <Select
                                    labelId="domain"
                                    label="Domain"
                                    labelWidth="75"
                                    name="domain"
                                    required
                                    value={this.state.submission.domain}
                                    onChange={this.handleChange}
                                    autoWidth
                                >
                                    {this.state.domain.map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center"
                        alignItems="center" spacing={4}>
                        <Grid item md={2}>
                            <FormControl
                                    variant="outlined"
                                    style={{
                                        width:'100%'
                                    }}
                                >

                                <InputLabel id="number" >Number</InputLabel>
                                <Select
                                    labelId="number"
                                    label="Number"
                                    labelWidth="75"
                                    name="number"
                                    required
                                    value={this.state.submission.number}
                                    onChange={this.handleChange}
                                    autoWidth
                                >
                                    {this.state.number.map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={9}>
                            <FormControl
                                    variant="outlined"
                                    style={{
                                        width:'100%'
                                    }}
                                >

                                <InputLabel id="title" >Title</InputLabel>
                                <Select
                                    labelId="title"
                                    label="Title"
                                    labelWidth="75"
                                    name="title"
                                    required
                                    value={this.state.submission.title}
                                    onChange={this.handleChange}
                                    autoWidth
                                >
                                    {this.state.title.map(e => (<MenuItem key={e} value={e}>
                                        {e}
                                    </MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Center>
                        <Button variant="conatined" style={{backgroundColor: '#3c00ff', color: '#ffffff', width:'70%', margin: '1%'}}
                            onClick={this.handleSelect}>Select</Button>
                        <Button variant="conatined" style={{backgroundColor: '#ff0000', color: '#ffffff', width:'20%', margin: '1%'}}
                            onClick={this.clearFilters}>Clear Filters</Button>
                    </Center>
                </Paper>
                <Paper style={{marginTop: '20px', display: `${this.state.selected}`}}>
                    <Grid container direction="row" justify="center"
                        alignItems="center" spacing={2}>
                        <Grid item md={11}>
                            <TextField
                                fullWidth={true}
                                required
                                name="description"
                                id="outlined-multiline-static"
                                label="Idea description (maximum 500 chars)"
                                multiline
                                rows="8"
                                variant="outlined"
                                inputProps={{ maxLength: 500 }}
                                value={this.state.submission.description}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item md={11}>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.update}
                                onError={errors => console.log(errors)}
                                style={{ width: '100%' }}
                            >
                                <TextValidator
                                    fullWidth={true}
                                    required
                                    name="link"
                                    id="outlined-full-width"
                                    label="Submission Link"
                                    fullWidth={true}
                                    variant="outlined"
                                    validators={['required','isLink']}    
                                    errorMessages={['Please enter Submission Link','Please enter valid Submission Link']}
                                    value={this.state.submission.link}
                                    onChange={this.handleChange}
                                />
                            </ValidatorForm>
                        </Grid>
                    </Grid>
                    <Center>
                        <Button variant="conatined" style={{backgroundColor: '#3c00ff', color: '#ffffff', width:'50%', margin: '1%'}}
                            onClick={this.onSubmit}>Submit</Button>
                    </Center>
                </Paper>
            </Container>
        )
    }
}