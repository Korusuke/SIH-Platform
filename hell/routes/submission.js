const express = require('express');
const redis = require('redis');
const router = express.Router();
const Team = require('../models/team.model');
const jwt = require('jsonwebtoken');

const client = redis.createClient({
    host: process.env.REDIS_KA_THING,
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
    const { teamName } = req.query;

    Team.findOne({teamName})
        .then(team => {
            if(typeof team.submission=='undefined')
                return res.json({'status': 'failure', 'msg': 'No submission found!'})
            return res.json({'status': 'success', 'msg': 'Submission found!', 'data': team.submission})
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'No submission found!'})})
})

router.post('/', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    const { teamName, submission } = req.body
    Team.findOne({teamName})
        .then(team => {
            team.submission = submission;
            team.save()
                .then(() => res.json({'status': 'success', 'msg': 'Submission Done!'}))
                .catch(err => {return res.json({'status': 'failure', 'msg': 'Submission failed!'})})
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Submission failed!'})})
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

router.post('/add_reviewer', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    const { teamName, reviewer } = req.body
    Team.findOne({teamName})
        .then(team => {
            team.reviewer = reviewer;
            team.save()
                .then(() => res.json({'status': 'success', 'msg': 'Reviewer Added'}))
                .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
})

router.post('add_mentor', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    const email = decodedData.payload.email || decodedData.payload.Email;
    if(typeof email=='undefined')
        return res.json({'status': 'failure', 'msg': 'No submission found!'})
    const { teamName, mentors } = req.body
    Team.findOne({teamName})
        .then(team => {
            team.mentors = mentors;
            team.save()
                .then(() => res.json({'status': 'success', 'msg': 'Mentor Added'}))
                .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
        })
        .catch(err => {return res.json({'status': 'failure', 'msg': 'Error occurred'})})
})

module.exports = router;
