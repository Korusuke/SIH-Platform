import React from 'react';
import { Paper, Grid, Button, Card } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

import FileSaver from 'file-saver';

import Center from 'react-center';

export default class Team extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.exportcsv = this.exportcsv.bind(this);
    }
    
    exportcsv(teamId) {
        let team = this.props.teams.filter(obj => obj.id == teamId)[0]
        let result = ""
        let keys = ["firstName", "middleName", "lastName", "gender", "year", "department", "phone", "comments", "labels", "isLeader", "teamName"]
        result += keys.join( ",") + "\n"
        team.members.forEach(e=>{
            console.log(e)
            for(let i = 0; i<keys.length -4; i++)
            {
                result += e[keys[i]] + ","
            }
            result += JSON.stringify(e.comments).replace(/,/g, "(comma)") + ","
            result += JSON.stringify(e.labels).replace(/,/g, "(comma)") + ","
            result += (e.role == "leader" ? "yes" : "no") +","
            result += team.name + "\n"
            
        })
        console.log(result)
        let blob = new Blob([result], {type: "text/csv;charset=utf-8"});
        FileSaver.saveAs(blob, `${team.name}_data.csv`);
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
                        <Button variant="contained" style={{backgroundColor: team.submitted ?'#00ff00' : '#ffaa00', color: '#ffffff', margin: '5px', width:'100%'}} startIcon={<TurnedInIcon />} disabled={!team.submitted}>{team.submitted ? "View Submission":"Not Submitted"}</Button>
                        <Button variant="contained" style={{backgroundColor: '#001155', color: '#ffffff', margin: '5px', width:'100%'}} startIcon={<ImportExportIcon />}
                            onClick={() => {this.exportcsv(team.id)}}>Export Team</Button>
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
            <div style={{width:'100%'}}>
                <br/>
                <Center>{arr.length} Team{arr.length == 1 ? "": "s"} Matched Filter</Center>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                {arr}
            </Grid>
            </div>
        )
    }
}