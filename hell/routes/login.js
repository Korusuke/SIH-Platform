const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    .find({email, password})
    if () {
        res.json({status: 'success'});
    } else {
        res.json({status: 'failed', message: 'Invalid email-password pair'});
    }
});

router.post('/verify', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    try {
        user = .find({email});
        if (user.otp==otp){
            res.json({status: 'success'});
        } else {
            res.json({status: 'failed', message: 'wrong message'});
        }
    } catch(error) {
        return res.json({status: "failed", message: 'Error occurred'});
    }
})

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        .find({email});
        if () {
            const otp = "otp";
            .insert({email, password, otp});
        
            res.json({status: 'success', otp: otp});
        } else {
            res.json({status: 'failed', message: 'User already exists'});
        }
        
    } catch (error) {
        return res.json({status: "failed", message: 'Error occurred'});
    }
})

module.exports = router;

