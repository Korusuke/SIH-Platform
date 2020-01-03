const express = require('express');
const redis = require('redis');
const router = express.Router();
const Team = require('../models/team.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const client = redis.createClient({
    host: process.env.REDIS_KEY,
    port: 6379
});

client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

router.get('/', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    User.findOne({email})
        .then(user => {
            Team.findOne({teamId: user.teamId})
                .then(team => {
                    if(email==team.leader)
                        role = 'leader'
                    else
                        role = 'member'
                    // console.log(team.submission);
                    if(team.submission.link.length==0 || team.submission.description.length==0)
                        return res.json({'status': 'failure', 'msg': 'No submission found!'})
                    // team.submitted = true;
                    let { title, domain, company, category, description, link, number } = team.submission;
                    let submission = {title, domain, company, category, description, link, number};
                    return res.json({'status': 'success', 'msg': 'Submission found!', 'submission': submission, 'role': role})
                })
                .catch(err => {console.log(err); return res.json({'status': 'failure', 'msg': 'No submission found!'})})
        })
        .catch(err => {console.log(err); return res.json({'status': 'failure', 'msg': 'No submission found!'})});
})

router.post('/', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    const { submission } = req.body;
    User.findOne({email})
        .then(user => {
            Team.findOne({teamId: user.teamId})
                .then(team => {
                    if(user.email!=team.leader)
                        return res.json({'status': 'failure', 'msg': 'Only team leader can submit'});
                    if(submission.description.length==0 || 
                        submission.link.length==0)
                        return res.json({'status': 'failure', 'msg': 'Submission failed!'});
                    for (var key in submission)
                        if(!['scores', 'reviewer_email', 'reviewed'].includes(key))
                            team.submission[key] = submission[key];
                    team.submitted = true;
                    team.save()
                        .then(() => res.json({'status': 'success', 'msg': 'Submission Done!'}))
                        .catch(err => {console.log(err); return res.json({'status': 'failure', 'msg': 'Submission failed!'})})
                })
                .catch(err => {console.log(err); return res.json({'status': 'failure', 'msg': 'Submission failed!'})})
        })
})

router.delete('/', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    Team.findOne({teamName})
        .then(team => {
            delete team.submission;
            team.save()
                .then(() => res.json({'status': 'success', 'msg': 'Submission deleted!'}))
                .catch(err => {return res.json({'status': 'failure', 'msg': 'Deletion Failed'})})
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Deletion failed'})})
})

module.exports = router;
