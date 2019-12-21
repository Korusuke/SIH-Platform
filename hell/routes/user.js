const express = require('express');
const redis = require('redis');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const _ = require("lodash")

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});


router.post('/', (req, res) => {
    // if using verifyToken middleware replace req.body.email with req.decoded.email
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('Decode: ',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;

    const filter = {
        email: email
    }
    let shape = ["squares", "isogrids", "space invaders"];
    let numberColours = [2,3,4];
    let theme = ["frogideas","heatwave","sugarsweets","daisygarden","seascape","berrypie","bythepool"];
    User.findOne(filter)
        .then((user) => {
        for(var key in req.body){
            user[key] = req.body[key];
        }
        user['profilePic'] = `https://www.tinygraphs.com/#?name=${req.body.email}&shape=${_.sample(shape)}&theme=${_.sample(theme)}&numcolors=${_.sample(numberColours)}#tryitout`
        user.save()
            .then(() => {
                res.json({'status': 'success', 'msg': 'user updated'});
            })
            .catch(() => res.status(500));
        })
        .catch(() => res.status(500));
})

router.get('/', (req, res) => {
    // if using verifyToken middleware replace req.body.email with req.decoded.email

    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;

    const filter = {
        email: email
    }

    User.findOne(filter)
        .then((user) => {
            res.json({
                'status': 'success',
                'msg': 'User found',
                'data': user,
            })
        })
        .catch(() => res.status(500));
})

module.exports = router;
