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
  "title":"Initial Notification",
  "date":"16th December"
  },
{
  "title":"Meeting and registration",
  "date":"7th January"   

  },
  {
    "title":"Team/Mentor formation",
    "date":"9th January"
  },
  {
    "title":"Internal Hackathon",
    "date":"15th January"
  }
]



export default function VerticalSlider() {

  function time_component(){
    var i = 0;
    return timeline.map(el => {
    if(i%2 == 0){
      i+=1
      return <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: '#fff', color: '#599D71', borderTop:'5px solid #F4902D' }}
        contentArrowStyle={{ borderRight: '7px solid #F4902D' }}
        date={timeline[i-1].date}
        iconStyle={{  background: '#fff', color: '#707070', border: '#707070',boxShadow:'0 0 0 4px #707070, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'}}
      >
    <h3 className="vertical-timeline-element-title">{timeline[i-1].title}</h3>
        
      </VerticalTimelineElement>
    }
    else{
      i+=1
      return <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: '#fff', color: '#599D71', borderTop:'5px solid #599D71' }}
        contentArrowStyle={{ borderRight: '7px solid #599D71' }}
        date={timeline[i-1].date}
        iconStyle={{  background: '#fff', color: '#707070', border: '#707070',boxShadow:'0 0 0 4px #707070, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'}}
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
    }}>

    {time_component()}
    
  
</VerticalTimeline>


  );
}
