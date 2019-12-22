import React, { Component } from 'react'
import Link from 'next/link';
import FitText from '@kennethormandy/react-fittext';
import { Grid, Card, Avatar, ButtonBase } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faMicrochip, faShareAlt } from '@fortawesome/free-solid-svg-icons'
// import '../styles/problemcard.css';

class ProblemCard extends Component {

  type(t) {
    if (t == 'Software') {
      return <Grid item xs={12} style={{ color: 'orange' }}>
        <FontAwesomeIcon icon={faCode} width="18" />
      </Grid>
    } else {
      return <Grid item xs={12} style={{ color: 'green' }}>
        <FontAwesomeIcon icon={faMicrochip} width="18" />
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
        <Link href='/problem/[Number]' as={`/problem/${this.props.card.Number}`} >
          <Card onMouseOver={this.toggleRaised}
            onMouseOut={this.toggleRaised}
            raised={this.state.raised}
            style={{
              width: '100%',
              minHeight: '250px',
              padding: '20px',
              position: 'relative'
            }}
          >

            <Grid container direction="column" >
              <Grid container item xs={12} direction="row" alignItems="center" spacing={2}>
                <Grid item >
                  <Avatar style={{ width: '75px', height: '75px', border: '1.5px solid black' }}>
                    <img src={`${this.props.url}${this.props.card.Logo}`} style={{width:'100%'}}/>
                  </Avatar>
                </Grid>

                <Grid item xs style={{ fontFamily: 'Roboto', fontSize: '2rem', textAlign: 'start' }}>
                  <FitText maxFontSize={24}>
                    {this.props.card.Company}
                  </FitText>
                </Grid>
                <Grid container item direction="column" style={{ textAlign: 'end', width: 'max-content', height: 'auto', lineHeight: 1.75 }}>

                  <Grid item xs={12}>
                    {this.props.card.Domain}
                  </Grid>

                  {this.type(this.props.card.Category)}
                  <Grid item xs={12}>
                    {this.props.card.Number}
                  </Grid>
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px', backgroundColor: 'rgba(13, 13, 13, 0.52)' }} />
              <Grid container item xs={12} direction="row" style={{ textAlign: 'start' }}>
                <span>
                  {this.props.card.Title}
                </span>
              </Grid>
              {/* <Grid container item xs={12} direction="row" justify="flex-end" style={{ textAlign: 'end' }}>
                <FontAwesomeIcon icon={faShareAlt} width="18" />
              </Grid> */}
            </Grid>

          </Card>
        </Link>
      </ButtonBase>

    );
  }
}

export default ProblemCard;
