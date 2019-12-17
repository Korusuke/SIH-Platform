const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');    
const { uuid } = require('uuidv4');
const Team = require('../models/team.model');
const User = require('../models/user.model');

router.post('/create', (req, res)=>{
  const { TeamName } = req.body;
  Team.findOne({'TeamName': TeamName}, (err, result)=>{
    if(err){
      console.log(err);
      res.send(500);
      return;
    }
    if(result){
      res.send('Team name already taken');
      return;
    }
    const Leader = req.body.sender;
    let Members = [Leader];
    InviteCode = otpGenerator.generate(6, { specialChars: false });
    TeamId = uuid(); 
    const doc = {
      TeamName,
      Leader,
      Members,
      InviteCode,
      TeamId
    };
    const team1 = new Team(doc);
    team1.save((err, result)=>{
      if(err){
        return console.log(err);
      }
      console.log("Saved", result);
      res.json({
        'msg': 'Saved document succesfully'
      });
    });
  });
});

router.post('/join', (req, res)=>{
  const { sender, InviteCode } = req.body;
  Team.findOne({'InviteCode': InviteCode}, (err, result)=>{
    if(err){
      res.send(500);
      return;
    }
    if(!result){
      res.send('Check your invite code again');
      return;
    }
    console.log(result);
    result.Members.push(sender);
    result.save();
    res.json({
      msg:'Hello there'
    });
    User.findOne({'email': sender}, (err, result)=>{
      if(err){
        res.send(500);
        return;
      }
      console.log(result);
    });
  });
});

module.exports = router;