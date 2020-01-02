import React from "react";
import { Paper, Grid, Button, Card, Typography } from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import Link from 'next/link'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReportIcon from "@material-ui/icons/Report";
import Center from "react-center";

import envvar from "../env";

export default class SubmissionTeam extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        let arr = [];
        this.props.teams.forEach(team => {
            arr.push(
                <Card
                    style={{ margin: "50px 0", width: "100%", padding: "10px" }}
                >
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                            md={3}
                            style={{ fontSize: "20px", textAlign: "center" }}
                        >
                            <span style={{ fontSize: "small" }}>
                                Team Name:
                            </span>
                            <br />
                            <span>{team.teamName}</span>
                            <br />
                            {team.submission.reviewed ? (
                                <div
                                    style={{
                                        fontSize: "small",
                                        color: "#008800",
                                        padding: "8px"
                                    }}
                                >
                                    <Center>
                                        <CheckCircleIcon fontSize="small" />{" "}
                                        Reviewed
                                    </Center>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: "small",
                                        color: "#ff7700",
                                        padding: "8px"
                                    }}
                                >
                                    <Center>
                                        <ReportIcon fontSize="small" />
                                        <span>Unreviewed</span>
                                    </Center>
                                </div>
                            )}
                            <Link as={`/review/${team.teamName}`} href="/review/[teamName]">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#001155",
                                    color: "#ffffff",
                                    margin: "5px",
                                    width: "100%"
                                }}
                                startIcon={<TurnedInIcon />}
                            >
                                View Submission
                            </Button>
                            </Link>

                            <br />
                            <br />
                        </Grid>
                        <Grid container direction="row" item xs={12} md={9} spacing={3}>
                            <Grid item xs={4}>
                                <Typography
                                    variant="overline"
                                    display="block"
                                >
                                    Category
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {team.submission.category}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    variant="overline"
                                    display="block"
                                >
                                    Number
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {team.submission.number}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    variant="overline"
                                    display="block"
                                >
                                    Domain
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {team.submission.domain}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="overline"
                                    display="block"
                                >
                                    Company
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {team.submission.company}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography
                                    variant="overline"
                                    display="block"
                                >
                                    Title
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {team.submission.title}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            );
        });

        return (
            <div style={{ width: "100%" }}>
                <br />
                <Center>
                    {arr.length} Team{arr.length == 1 ? "" : "s"} Matched Filter
                </Center>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    {arr}
                </Grid>
            </div>
        );
    }
}
