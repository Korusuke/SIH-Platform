import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css'
import { borderTop } from '@material-ui/system';


const timeline = [
  {
    "key":0,
  "title":"Initial Notification",
  "date":"16th December"
  },
{
  "key":1,
  "title":"Meeting and registration",
  "date":"7th January"

  },
  {
    "key":2,
    "title":"Team/Mentor formation",
    "date":"9th January"
  },
  {
    "key":3,
    "title":"Internal Hackathon",
    "date":"15th January"
  }
]



export default function VerticalSlider() {

  function time_component(){
    var i = 0;
    return timeline.map(el => {
    if(i%2 == 0){

      if (i !== 0) {
        var c = -5
      } else {
        var c = 1
      }
      i += 1
      return <VerticalTimelineElement
        className="orange-timeline-element"
        contentStyle={{ marginTop: `${c}vh`}}
        contentArrowStyle={{ borderRight: '7px solid #F4902D' }}
        date={timeline[i-1].date}
      >
    <h3 className="vertical-timeline-element-title">{timeline[i-1].title}</h3>

      </VerticalTimelineElement>
    }
    else{
      i += 1
      c = -5
      return <VerticalTimelineElement
        className="green-timeline-element"
        contentArrowStyle={{ borderRight: '7px solid #599D71' }}
        date={timeline[i-1].date}
      >
        <h3 className="vertical-timeline-element-title">{timeline[i-1].title}</h3>

      </VerticalTimelineElement>;
    }
  })
}

  return (
    <VerticalTimeline style={{
        '&..before':{
            background:'#707070'
        }
    }}
    >

    {time_component()}


</VerticalTimeline>


  );
}
