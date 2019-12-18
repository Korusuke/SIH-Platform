const express = require('express');
const jwt = require('jsonwebtoken');  
const redis = require('redis');
const router = express.Router(); 
const User = require('../models/user.model');

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
    blacklistedTokens = await client.lrange('blacklistedTokens',0,-1);
    if(token in blacklistedTokens){
      res.json({
        "msg":"Token invalidated, please sign in again",
      });
      return;
    } 
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        res.json({'msg': 'Token expired'});
      }
      else{
        req.token = token;
        req.decoded = decoded;
        next();
      }
    });
}

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
