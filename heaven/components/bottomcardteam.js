import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../styles/bottomcard.css";
import Grid from "@material-ui/core/Grid";
import Center from "react-center";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
class App extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            teamname: "",
            createClicked: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount() {

        ValidatorForm.addValidationRule('isOkay', (value) => {
            // console.log('validating team name');
            var v = value.toLowerCase()
            if (v.indexOf('somaiya')!==-1 || v.indexOf('kjsce')!==-1) {
                return false;
            }

            return true;
        });
    }

    handleChange(event) {
        let { name, type, value, checked } = event.target;

        type != "checkbox"
            ? this.setState({
                  [name]: value
              })
            : this.setState({
                  [name]: checked
              });

        console.log(name, value);
    }

    handleSubmit() {
        this.setState(
            {
                createClicked: true
            }
        )
        try{
            fetch(`${this.props.url}/team/create/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify( {
                    teamName: this.state.teamname
                })
            }).then(res => res.json())
            .then(data => {
                this.setState({
                        createClicked: false
                })
                if (data.status == "success")
                    this.props.changeParentState(3, data);
                else this.props.changeParentState(-1, data);
            }).catch(e =>{
                this.setState({
                    createClicked: false
            })
                console.log(e)
                data = {
                    status: 'error',
                    msg: 'Something went wrong :('
                }
                this.props.changeParentState(-1, data);
                });
        }
        catch(e)
        {
            this.setState({
                createClicked: false
        })
            console.log(e)
            data = {
                status: 'error',
                msg: 'Something went wrong :('
            }
            this.props.changeParentState(-1, data);
        }
    }

    render() {
        return (
            <div className="maindiv">
                <Center style={{ height: "100%" }}>
                    {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <div className="App">
          <div className="maincard">
          <TextField className="inputCent" id="teamcode" label="Team code" variant="outlined" />
          <Button variant="contained" className="inputConf" color="primary">Confirm</Button>
          </div>
      </div> */}
                    <ValidatorForm
                        ref="form"
                        onError={errors => console.log(errors)}
                        onSubmit={this.handleSubmit}
                        style={{ width: '100%' }}
                    >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <Grid item xs={6}>
                            <TextValidator
                                name="teamname"
                                id="teamname"
                                label="Team name"
                                variant="outlined"
                                value={this.state.teamname}
                                validators={['required','isOkay']}
                                errorMessages={['Please enter team name','Team name cannot contain Somaiya or KJSCE']}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button
                                style={{ width: "100%" }}
                                variant="contained"
                                color="primary"
                                disabled={this.state.createClicked}
                                onClick={this.handleSubmit}
                            >
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                    </ValidatorForm>
                </Center>
            </div>
        );
    }
}

export default App;
