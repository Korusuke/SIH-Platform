import React, { Component } from "react";
import Link from "next/link";
import FitText from "@kennethormandy/react-fittext";
import { Grid, Card, Avatar, ButtonBase, Chip } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faMicrochip,
    faShareAlt
} from "@fortawesome/free-solid-svg-icons";
// import '../styles/problemcard.css';

const fontColor = function(hex) {
    let col = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(col[1], 16) / 255.0,
        g = parseInt(col[2], 16) / 255.0,
        b = parseInt(col[3], 16) / 255.0;
    let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    r = luminance > 0.5 ? 0 : 255;
    return "#" + ((1 << 24) + (r << 16) + (r << 8) + r).toString(16).slice(1);
};
class ProblemCard extends Component {
    type(t) {
        if (t == "Software") {
            return (
                <Grid item xs={12} style={{ color: "orange" }}>
                    <FontAwesomeIcon icon={faCode} width="18" />
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12} style={{ color: "green" }}>
                    <FontAwesomeIcon icon={faMicrochip} width="18" />
                </Grid>
            );
        }
    }
    state = {
        raised: false
    };

    toggleRaised = () => this.setState({ raised: !this.state.raised });

    render() {
        let labelsJSX;
        //console.log('BI', labelsJSX, this.props.labels)
        if (this.props.labels.labels && this.props.labels.labels.length > 0) {
            //console.log('HI', labelsJSX, this.props.labels.labels)
            labelsJSX = this.props.labels.labels.map(e => (
                <Grid item>
                    <Chip
                        style={{
                            background: e.color,
                            color: fontColor(e.color)
                        }}
                        size="small"
                        label={e.label}
                    />
                </Grid>
            ));

            // console.log(labelsJSX, this.props.labels)
        }

        return (
            <ButtonBase style={{ width: "100%" }}>
                <Link
                    href="/problem/[Number]"
                    as={`/problem/${this.props.card.Number}`}
                >
                    <Card
                        onMouseOver={this.toggleRaised}
                        onMouseOut={this.toggleRaised}
                        raised={this.state.raised}
                        style={{
                            width: "100%",
                            minHeight: "250px",
                            padding: "20px",
                            position: "relative"
                        }}
                    >
                        <Grid container direction="column">
                            <Grid
                                container
                                item
                                xs={12}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item>
                                    <Avatar
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                            border: "1.5px solid black"
                                        }}
                                    >
                                        <img
                                            src={`${this.props.url}${this.props.card.Logo}`}
                                            style={{ width: "100%" }}
                                        />
                                    </Avatar>
                                </Grid>

                                <Grid
                                    item
                                    xs
                                    style={{
                                        fontFamily: "Roboto",
                                        fontSize: "2rem",
                                        textAlign: "start"
                                    }}
                                >
                                    <FitText maxFontSize={24}>
                                        {this.props.card.Company}
                                    </FitText>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    direction="column"
                                    style={{
                                        textAlign: "end",
                                        width: "max-content",
                                        height: "auto",
                                        lineHeight: 1.75
                                    }}
                                >
                                    <Grid item xs={12}>
                                        {this.props.card.Domain}
                                    </Grid>

                                    {this.type(this.props.card.Category)}
                                    <Grid item xs={12}>
                                        {this.props.card.Number}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Divider
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    backgroundColor: "rgba(13, 13, 13, 0.52)"
                                }}
                            />
                            <Grid
                                container
                                item
                                xs={12}
                                direction="row"
                                style={{ textAlign: "start" }}
                            >
                                <span>{this.props.card.Title}</span>
                            </Grid>
                            
                            <Grid
                                container
                                item
                                xs={12}
                                direction="row"
                                style={{ textAlign: "start", marginTop:"10px" }}
                                spacing={1}
                            >
                                {this.props.labelLoading ? "Loading Labels..." : labelsJSX }
                            </Grid>
                        </Grid>
                    </Card>
                </Link>
            </ButtonBase>
        );
    }
}

export default ProblemCard;
