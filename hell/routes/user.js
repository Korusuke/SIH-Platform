const express = require('express');
const redis = require('redis');
const router = express.Router(); 
const User = require('../models/user.model');

const client = redis.createClient();
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});


router.post('/', (req, res) => {
    // if using verifyToken middleware replace req.body.email with req.decoded.email
    if (!req.body.email){
        res.json({
            'status': 'failure',
            'msg': 'Invalid Fields'
        })
    }
    const filter = {
        email: req.body.email
    }

    User.findOne(filter)
        .then((user) => {
        for(var key in req.body){
            user[key] = req.body[key];
        }
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
    if (!req.body.email){
        res.json({
            'status': 'failure',
            'msg': 'Invalid Fields'
        })
    }
    const filter = {
        email: req.body.email
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
