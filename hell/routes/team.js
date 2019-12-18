const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');    
const { uuid } = require('uuidv4');
const team = require('../models/team.model');
const User = require('../models/user.model');
const redis = require('redis')
const jwt = require('jsonwebtoken');


const privateKey = process.env.KEY;

const client = redis.createClient();
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if(!token){
    res.json({
      'msg': 'Token not present'
    });
  }
  blacklistedTokens = await client.lrange('blacklistedTokens',0,-1);
  console.log('Blacklist: ', blacklistedTokens)
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

router.post('/create', (req, res)=>{
  const { TeamName /*,Leader*/ } = req.body;
  Team.findOne({'TeamName': TeamName}, (err, result)=>{
    if(err){
      console.log(err);
      res.send(500);
      return;
    }
    if(result){
      res.json(
        {
          'status': 'error',
          'msg': 'Team Name Already Taken',
        }
      );
      return;
    }
    // Use with middleware
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('Decode: %s',decodedData)
    const Leader =decodedData.payload.Email;
    let Members = [Leader];
    InviteCode = otpGenerator.generate(6, { specialChars: false });
    TeamId = uuid(); 
    const doc = {
      teamName,
      leader,
      members,
      inviteCode,
      teamId
    };
    const team1 = new Team(doc);
    team1.save((err, result)=>{
      if(err){
        return console.log(err);
      }
      console.log("Saved", result);
      res.json({
        'status': 'success',
        'msg': 'Team Created Successfully',
        'InviteCode':InviteCode,
        team: team1
      });
    });
  });
});

router.post('/join', (req, res)=>{
  const { InviteCode } = req.body;
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  console.log('Decode: %s',decodedData)
  const user = decodedData.payload.Email;
  console.log(decodedData)
  console.log(InviteCode)
  console.log(req.body)
  Team.findOne({'InviteCode': InviteCode}, (err, result)=>{
    if(err){
      res.send(500);
      return;
    }
    if(!result){
      res.json(
        {
          status: 'error',
          msg: 'Check your Invite Code again :/'
        }
      );
      return;
    }
    console.log(result);
    result.members.push(user);
    result.save();
    res.json({
      status: 'success',
      msg:'Joined Successfully',
      team: result
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

router.post('/currentTeam', (req, res)=>{
  const { InviteCode } = req.body;
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  const user = decodedData.payload.Email;
  
  Team.findOne({"Members" : {"$in" : [user]}}, (err, result)=>{
    if(err){
      res.send(500);
      return;
    }
    if(!result){
      res.json(
        {
          status: 'success',
          state: 0
        }
      );
      return;
    }
    console.log(result);
    
    res.json({
      status: 'success',
      state: 3,
      team:result
    });
    
  });
});

module.exports = router;