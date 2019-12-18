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
  const { teamName } = req.body;
  Team.findOne({'teamName': teamName}, (err, result)=>{
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
    let members = [leader];
    inviteCode = otpGenerator.generate(6, { specialChars: false });
    teamId = uuid(); 
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
        'msg': 'Saved document succesfully'
      });
    });
  });
});

router.post('/join', verifyToken, (req, res)=>{
  const { inviteCode } = req.body;
  const decodedData = jwt.decode(req.token);
  const user = decodedData.email;
  team.findOne({'InviteCode': InviteCode}, (err, result)=>{
    if(err){
      res.send(500);
      return;
    }
    if(!result){
      res.send('Check your invite code again');
      return;
    }
    console.log(result);
    result.members.push(user);
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