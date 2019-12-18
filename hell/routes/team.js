const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');    
const { uuid } = require('uuidv4');
const Team = require('../models/team.model');
const User = require('../models/user.model');

async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if(!token){
    res.json({
      'msg': 'Token not present'
    });
  }
  blacklistedTokens = await client.lrange('blacklistedTokens',0,-1);
  if(token in blacklistedTokens){
    res.json({
      "msg":"Token invalidated, please sign in again",
    });
    return;
  } 
  jwt.verify(token, privateKey, (err) => {
    if (err) {
      res.json({'msg': 'Token expired'});
    }
    else{
      req.token = token;
      next();
    }
  });
}

router.post('/create', verifyToken, (req, res)=>{
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
    const decodedData = jwt.decode(req.token);
    const Leader =decodedData.Email;
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

router.post('/join', verifyToken, (req, res)=>{
  const { InviteCode } = req.body;
  const decodedData = jwt.decode(req.token);
  const user = decodedData.Email;
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
    result.Members.push(user);
    result.save();
    res.json({
      msg:'Hello there'
    });
    User.findOne({'email': user}, (err, result)=>{
      if(err){
        res.send(500);
        return;
      }
      console.log(result);
    });
  });
});

module.exports = router;