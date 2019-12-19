const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');    
const { uuid } = require('uuidv4');
const Team = require('../models/team.model');
const User = require('../models/user.model');
const redis = require('redis')
const jwt = require('jsonwebtoken');
const {verifyToken} = require('./token');

const client = redis.createClient();
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

router.use('/invite', require('./invitation'));

router.post('/create', (req, res)=>{
  const { teamName } = req.body;
  Team.findOne({'teamName': teamName}, (err, result)=>{
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
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('Decode: %s',decodedData)
    // Remove req.body.email for production env
    const leader = decodedData.payload.Email?decodedData.payload.Email:req.body.email;
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
        'status': 'success',
        'msg': 'Team Created Successfully',
        'inviteCode':inviteCode,
        team: team1
      });
    });
  });
});

router.post('/join', (req, res)=>{
  const { inviteCode } = req.body;
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  console.log('Decode: %s',decodedData)
  const user = decodedData.payload.Email;
  Team.findOne({'inviteCode': inviteCode}, (err, result)=>{
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
    result.members.push(user);
    result.save();
    res.json({
      status: 'success',
      msg:'Joined Successfully',
      team: result
    });
    User.findOne({'email': user}, (err, user)=>{
      if(err){
        res.send(500);
        return;
      }
      user.teamId = result.teamId;
      user.save();
    });
  });
});

router.post('/currentTeam', (req, res)=>{
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  const user = decodedData.payload.Email;
  Team.findOne({"members" : {"$in" : [user]}}, (err, result)=>{
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

router.post('/exit', verifyToken, (req,res)=>{
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  const user = decodedData.payload.Email?decodedData.payload.Email:req.body.email;
  Team.findOne({members:user},async (err, data)=>{
    if(err){
      console.log(err);
      res.send(500)
      return;
    }
    if(data.leader === user){
      await removeUser(user);
      if(data.members.length()==0){
        deleteTeam(user);
        res.status(200).json({
          msg:'Deleted team since no other member present'
        })
        return;
      }
      data.leader=members[0]
      data.save();
      res.send(200).json({msg: 'Exited team'});
    }
  });
});

async function removeUser(user){
  await User.findOneAndUpdate({members: user}, {$pull:{members: user}},{new: true} ,(err, data)=>{
    if(err){
      console.log(err);
      res.send(500);
      return;
    }
    console.log(data);
  });
}

router.post('/delete', (req, res)=>{
  const { email } = req.body;
  deleteTeam(email);
  res.json({msg:'Done'});
});

function deleteTeam(user){
  Team.find({leader: user}, (err, teamData)=>{
    if(err){
      console.log(err);
      res.send(500);
      return;
    }
    User.find({teamId: teamData.teamId}, (err, userData)=>{
      if(err){
        console.log(err);
        res.send(500);
        return;
      }
      console.log(userData);
    })
  })
}

module.exports = router;
