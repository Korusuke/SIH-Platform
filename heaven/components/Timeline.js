import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css'
import { borderTop } from '@material-ui/system';


export default function VerticalSlider() {

  return (
    <VerticalTimeline style={{
        '&..before':{
            background:'#707070'
        }
    }}>
        
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#fff', color: '#599D71', borderTop:'5px solid #F4902D' }}
    contentArrowStyle={{ borderRight: '7px solid #F4902D' }}
    date="16th,December"
    iconStyle={{  background: '#fff', color: '#707070', border: '#707070',boxShadow:'0 0 0 4px #707070, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'}}
    // // // icon={<Work// icon />}
  >
    <h3 className="vertical-timeline-element-title">Initial Notification</h3>
    
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#fff', color: '#599D71', borderTop:'5px solid #599D71' }}
    contentArrowStyle={{ borderRight: '7px solid #599D71' }}
    date="7th January"
    iconStyle={{  background: '#fff', color: '#707070', border: '#707070',boxShadow:'0 0 0 4px #707070, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'}}
    // // icon={<Work// icon />}
  >
    <h3 className="vertical-timeline-element-title">Meeting and Registration</h3>
   
  </VerticalTimelineElement>
 

  
</VerticalTimeline>


  );
}
