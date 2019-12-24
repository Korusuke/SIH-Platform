const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');
const { uuid } = require('uuidv4');
const Team = require('../models/team.model');
const User = require('../models/user.model');
const redis = require('redis')
const jwt = require('jsonwebtoken');
const {verifyToken} = require('./token');

const client = redis.createClient({
  host: process.env.REDIS_KEY,
  port: 6379
});
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

router.use('/invite', require('./invitation'));

router.get('/', (req, res) => {
  var data = []
  Team.find({})
    .then(teams => {
      for(let i in teams){
        let team_data = {
          id: teams[i].teamId,
          name: teams[i].teamName,
          members: []
        }
        let members = []
        User.find({email: {'$in': teams[i].members}})
          .then(users => {
              members = users;
              for(var i in users)
                team_data.members.push(users[i]);
              return team_data
            }
          ).then((team_data) => {
            data.push(team_data);
            if (i==teams.length-1){
              console.log(data);
              return res.json(data);
            }
          }).catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err))
  // return res.json(data);
})

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
    const leader = decodedData.payload.email || decodedData.payload.Email;
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
      User.findOne({email: leader})
        .then(user => {
          console.log("Saved", result);
          user.teamId = result.teamId;
          user.save()
            .then(() => {
              res.json({
                'status': 'success',
                'msg': 'Team Created Successfully',
                'inviteCode':inviteCode,
                team: {
                  teamName: result.teamName,
                  inviteCode: inviteCode,
                  members: [{
                  email: user.email,
                  role: 'leader',
                  name: user.firstName + " " + user.lastName
                }]
              }
            })  
        })
      });
    });
  });
});

router.post('/join', (req, res)=>{
  const { inviteCode } = req.body;
  console.log(req.body)
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  console.log('Decode:',decodedData)
  const user = decodedData.payload.email || decodedData.payload.Email;
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
    if(result.members.length==6) {
      return res.json(
        {
          status: 'error',
          msg: 'Team already full'
        }
      );
    }
    if(result.members)
    result.members.push(user);
    result.save();
    let members = []
    User.find({email: {'$in': result.members}})
      .then(users => {
          for(var i in users){
            members.push({
              email: users[i].email,
              name: users[i].firstName + ' ' + users[i].lastName,
              role: users[i].email==result.leader ? 'leader' : 'member'
            });
            if(users[i].email==user) {
              users[i].teamId = result.teamId;
              users[i].save();
            }
          }
          return res.json({
            status: 'success',
            msg:'Joined Successfully',
            inviteCode: result.inviteCode,
            team: {
              teamName: result.teamName,
              members
            }
          });
        }
      ).catch(err => console.log(err));
  });
});

router.post('/currentTeam', (req, res)=>{
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  const user = decodedData.payload.email || decodedData.payload.Email;
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
    var team_data = {
      teamName: result.teamName,
      inviteCode: result.inviteCode,
      members: []
    }
    User.find({email: {'$in': result.members}})
      .then(users => {
          members = users;
          for(var i in users)
            team_data.members.push({
              email: users[i].email,
              name: users[i].firstName + ' ' + users[i].lastName,
              role: users[i].email==result.leader ? 'leader' : 'member'
            });
          return res.json({'status': 'success', 'state': 3, 'team': team_data});
        }
      ).catch(err => console.log(err));
  });
});

router.post('/exit', verifyToken, (req,res)=>{
  const decodedData = jwt.decode(req.cookies.token, {complete: true});
  const user = decodedData.payload.email || decodedData.payload.Email;
  Team.findOne({"members" : {"$in" : [user]}},async (err, data)=>{
    if(err){
      console.log(err);
      res.send(500)
      return;
    }
      let index = data.members.indexOf(user);

      if (index > -1)
        data.members.splice(index, 1);

      if(data.members.length!=0){
        data.leader=data.members[0]
        data.save();
      }
      else
        data.remove();
      User.findOne({email: user})
        .then(user => {
          user.teamId = "";
          user.save();
          res.json({status: 'success', msg: 'Exited team'});
        })

  });
});

async function removeUser(user){
  await Team.findOneAndUpdate({members: user}, {$pull:{members: user}},{new: true} ,(err, data)=>{
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
    });
  });
}

module.exports = router;
