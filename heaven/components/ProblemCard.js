import React, { Component } from 'react'
import Link from 'next/link';
import FitText from '@kennethormandy/react-fittext';
import '../styles/problemcard.css';
import { Grid, Card, Avatar, ButtonBase } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faMicrochip } from '@fortawesome/free-solid-svg-icons'
class ProblemCard extends Component {

  type(t) {
    if (t == 'Software') {
      return <Grid item xs={12} style={{color:'orange'}}>
        <FontAwesomeIcon icon={faCode} />
      </Grid>
    } else {
      return <Grid item xs={12} style={{ color: 'green' }}>
        <FontAwesomeIcon icon={faMicrochip} />
      </Grid>
    }
  }
  state = {
    raised: false
  }

  toggleRaised = () => this.setState({ raised: !this.state.raised });

  render() {

    return (
      <ButtonBase style={{ width: '100%' }}>
        <Link href="/problem/[id]" as={`/problem/${this.props.card['_id']}`}>
      <Card onMouseOver={this.toggleRaised}
        onMouseOut={this.toggleRaised}
        raised={this.state.raised}
        style={{ width: '100%' }} className="maincard">

          <Grid container direction="coloumn" >
          <Grid container item xs={12} direction="row" alignItems="center" spacing={2}>
            <Grid item >
                <Avatar style={{ width: '75px', height: '75px', border:'1.5px solid black'}}>
                  <img src="https://hack.kjscecodecell.com/assets/team/compressed/Karan.png" />
                </Avatar>
            </Grid>

              <Grid item xs style={{ fontFamily: 'Roboto', fontSize: '2rem', textAlign: 'start' }}>
              <FitText maxFontSize={24}>
                  {this.props.card.Company}
                </FitText>
              </Grid>
            <Grid constainer item direction="coloumn" style={{ textAlign: 'end',width: 'max-content', height: 'auto' }}>

                <Grid item xs={12}>
                  {this.props.card.Domain}
              </Grid>

                {this.type(this.props.card.Category)}
                <Grid item xs={12}>
                  {this.props.card.Number}
                </Grid>
              </Grid>
            </Grid>

          <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgba(13, 13, 13, 0.52)'}}/>
            <Grid container item xs={12} direction="row" style={{ textAlign: 'start'}}>
              <span>
                {this.props.card.Title}
              </span>
            </Grid>
          </Grid>

          </Card>
        </Link>
      </ButtonBase>

    );
  }
}

export default ProblemCard;
