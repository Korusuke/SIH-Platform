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

router.get("/", (req, res) => {
    // try{
    //     const decodedData = jwt.decode(req.cookies.token, {complete: true});
    //     console.log('Decode: %s',decodedData)
    //     // Remove req.body.email for production env
    //     const admin = decodedData.payload.email || decodedData.payload.Email
    //     const admins = ['rushang.g@somaiya.edu']
    //     if (!admins.includes(admin))
    //         return res.json({'status': 'failure', 'msg': 'User has no admin privileges'});
    // } catch(err) {return res.json({'status': 'failure', 'msg': 'User has no admin privileges'})};
    
    Team.find({})
        .then(teams => {
            const data = [];
            console.log('TEAM', teams.length)
            
            for (let i in teams) {
                console.log('I', i)
                let team_data = {
                    id: teams[i].teamId,
                    name: teams[i].teamName,
                    members: []
                };

                User.find({ email: { $in: teams[i].members } })
                    .then(users => {
                        members = users;
                        let user_data;
                        //console.log('DATA', data)
                        for (var i in users) {
                            let {email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone} = users[i]
                            user_data = {email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone}
                            
                            console.log(email, teams[i].leader)
                            if (user_data.email == teams[i].leader)
                                user_data.role = "leader";
                            //console.log(user_data)
                            team_data.members.push(user_data);
                        }
                        // return team_data

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

module.exports = router;
