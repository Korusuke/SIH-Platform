import React from 'react';
import { Paper, Grid, Button, Card } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TurnedInIcon from '@material-ui/icons/TurnedIn';


import Center from 'react-center';

export default class Team extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.exportcsv = this.exportcsv.bind(this);
    }
    
    exportcsv(name) {
        console.log(name);
    }

    render() {
        let arr = [];
        this.props.teams.forEach(team => {
            let members = [];
            team.members.forEach(member => {
                var role = "";
                if(member.role=='leader')
                    role = <Button variant="contained"
                        style={{width: '90%', backgroundColor: '#F18F63', color: '#ffffff'}} disableElevation disableRipple>Leader</Button>
                members.push(
                <Grid item xs={12} style={{margin: '20px'}}>
                    <Paper>
                    <Grid container direction="row" justify="center"
                        alignItems="center" spacing={2}>
                        <Grid item md={3} style={{fontSize: '20px',textAlign:'center'}}>{member.firstName + " " + member.lastName}</Grid>
                        <Grid item md={7} style={{fontSize: '20px'}}>{member.email}</Grid>
                        <Grid item md={2}>{role}</Grid>
                    </Grid>
                    </Paper>
                </Grid>
                )
            })
            arr.push(
                <Card style={{ margin: '50px 0', width:'100%', padding: '10px'}}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={12} md={3} style={{fontSize: '20px', textAlign: 'center'}}>
                        <span>Team Name:</span><br/>
                        <span>{team.name}</span><br/>
                        <Button variant="contained" style={{backgroundColor: '#64ff64', color: '#ffffff', margin: '5px', width:'100%'}} startIcon={<TurnedInIcon />}>View Submission</Button>
                        <Button variant="contained" style={{backgroundColor: '#ff0000', color: '#ffffff', margin: '5px', width:'100%'}} startIcon={<ImportExportIcon />}
                            onClick={this.exportcsv(team.name)}>Export Team</Button>
                        <br/>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {members}
                    </Grid>
                </Grid>
                </Card>
            )
        })

        return (
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                {arr}
            </Grid>
        )
    }
}