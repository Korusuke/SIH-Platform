const express = require('express');
const redis = require('redis');
const router = express.Router();
const User = require('../models/user.model');
const Team = require('../models/team.model');
const jwt = require('jsonwebtoken');
const _ = require("lodash")

const multer = require('multer');
const client = redis.createClient({
    host: process.env.REDIS_KEY,
    port: 6379
});

client.on('error', (err) => {
    console.log('Something went wrong ', err);
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'storage/userphotos')
    },
    filename: function (req, file, cb) {
        cb(null, (req.body.email || "null") + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('profilePic')


router.get('/leader', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    // console.log('Decode: ',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;
    User.findOne({email})
        .then(user => {
            Team.findOne({'teamId': user.teamId})
                .then(team => {
                    let role;
                    if(team.leader==email)
                        role = 'leader'
                    else
                        role = 'member'
                    return res.json({'status': 'success', 'msg': 'Sending role', role})
                })
                .catch(err => {return res.status(500)})
        })
        .catch(err => {return res.status(500)})
    return res.status(500)
})

router.post('/', upload, (req, res) => {

    console.log(req.body, req.file, req.cookies)

    // if using verifyToken middleware replace req.body.email with req.decoded.email
    const decodedData = jwt.decode(req.cookies.token, { complete: true });
    // console.log('Decode: ',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;

    const filter = {
        email: email
    }

    let shape = ["squares", "isogrids", "space invaders"];
    let numberColours = [2, 3, 4];
    let theme = ["frogideas", "heatwave", "sugarsweets", "daisygarden", "seascape", "berrypie", "bythepool"];
    User.findOne(filter)
        .then((user) => {
            for (var key in req.body) {
                if (key != 'email' && key != 'profilePic')
                    user[key] = req.body[key];
            }

            if (req.file) {
                user['profilePic'] = `/images/${email}-${req.file.originalname}`
            }

            user.save()
                .then(() => {
                    console.log('saved')
                    res.json({ 'status': 'success', 'msg': 'user updated' });
                })
                .catch(() => res.status(500));
        })
        .catch(() => res.status(500));
})

router.get('/', (req, res) => {
    // if using verifyToken middleware replace req.body.email with req.decoded.email

    const decodedData = jwt.decode(req.cookies.token, { complete: true });
    // console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;

    const filter = {
        email: email
    }

    User.findOne(filter)
        .then((user) => {
            let { email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone, rollNo, resume, bio } = user
            let user_data = { email, firstName, lastName, middleName, gender, year, department, division, comments, labels, profilePic, phone, rollNo, resume, bio }
            console.log(user_data);
            res.json({
                'status': 'success',
                'msg': 'User found',
                'data': user_data,
            })
        })
        .catch(() => res.status(500));
})

module.exports = router;
