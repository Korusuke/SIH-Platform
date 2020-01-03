const express = require("express");
const router = express.Router();
var otpGenerator = require("otp-generator");
const { uuid } = require("uuidv4");
const Team = require("../models/team.model");
const User = require("../models/user.model");
const redis = require("redis");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./token");

const client = redis.createClient({
    host: process.env.REDIS_KA_THING,
    port: 6379
});

client.on("error", err => {
    console.log("Something went wrong ", err);
});

const admins = ['avani.sakhapara@somaiya.edu']

router.get("/", (req, res) => {
    try{
        const decodedData = jwt.decode(req.cookies.token, {complete: true});
        console.log('Decode: %s',decodedData)
        // Remove req.body.email for production env
        const admin = decodedData.payload.email || decodedData.payload.Email
        if (!admins.includes(admin))
            return res.json({'status': 'failure', 'msg': 'User has no admin privileges'});
    } catch(err) {return res.json({'status': 'failure', 'msg': 'User has no admin privileges'})};
    
    Team.find({})
        .then(teams => {
            const data = [];
            // console.log('TEAM', teams.length)
            
            for (let i in teams) {
                // console.log('I', i)
                let team_data = {
                    id: teams[i].teamId,
                    name: teams[i].teamName,
                    members: [],
                    submission: teams[i].submission,
                    submitted: teams[i].submitted
                };

                User.find({ email: { $in: teams[i].members } })
                    .then(users => {
                        members = users;
                        let user_data;
                        //console.log('DATA', data)
                        for (var j in users) {
                            let {email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone} = users[j]
                            user_data = {email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone}
                            
                            if (user_data.email == teams[i].leader)
                                user_data.role = "leader";
                            team_data.members.push(user_data);
                        }

                        data.push(team_data);
                        if (data.length == teams.length) {
                            //console.log(data);
                            return res.json(data);
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

router.post('/add_score', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    const { scores, teamId } = req.body;
    Team.findOne({teamId: teamId})
        .then(team => {
            
            team.submission.scores = {}
            for(var key in scores) {
                console.log(key)
                team.submission.scores[key] = scores[key];
            }
            team.submission.reviewed = true
            team.save()
                .then(() => {
                    console.log(team)
                    return res.json({'status': 'success', 'msg': 'Scores added!'})
                })
                .catch(err => {
                    console.log(err)
                    return res.json({'status': 'failure', 'msg': 'Some error occurred!'})
                })
        })
        .catch(err => {
            console.log(err)
            return res.json({'status': 'failure', 'msg': 'Some error occurred!'})
        })
})

router.post('/add_reviewer', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    // if (!admins.includes(email))
    //     return res.json({'status': 'failure', 'msg': 'User has no admin privileges'});
    const { reviewer, teamName } = req.body
    // console.log(reviewer, teamName);
    Team.findOne({teamName})
        .then(team => {
            team.submission.reviewer = reviewer;
            team.save()
                .then(() => res.json({'status': 'success', 'msg': 'Reviewer Added'}))
                .catch(err => {console.log(err); return res.json({'status': 'failure', 'msg': 'Error occurred'})})
            })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
})

router.get('/submissions', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    // const { email } = req.query;
    // if (!admins.includes(email))
    //     return res.json({'status': 'failure', 'msg': 'User has no admin privileges'});
    Team.find({/*"submission.reviewer": email*/ submitted: true})
        .then(teams => {
            let submissions = [];
            for(var i in teams){
                submissions.push({
                    teamId: teams[i].teamId,
                    teamName: teams[i].teamName,
                    submission: teams[i].submission
                })
            }
            return res.json({'status': 'success', 'msg': 'Submissions fetched', 'submissions': submissions});
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
})
module.exports = router;
