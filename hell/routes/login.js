const express = require('express');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../models/user.model');
const LoginData = require('../models/logindata.model');
const { verifyToken } = require('./token');
const redis = require('redis');
const _ = require('lodash')
const client = redis.createClient({
    host: process.env.REDIS_KEY,
    port: 6379
});
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});


// Redirect from reset link to password reset page if success. From there call update password
// Kuch bhi

router.post('/reset/*', (req, res)=>{
    let url = req.originalUrl.split("/");
    let token = url[url.length-1];
    let {password} = req.body
    console.log(token)
    client.get(token, (err, user)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(user===null){
            res.json({
                msg:'Link invalid'
            });
            return;
        }
        console.log(user);
        if(!password)
        {
            res.sendStatus(500);
        }
        /*await*/ client.del(token);
        res.send(200).json({
            msg:'Reset link okay',
            user: user,
        });
    });

    User.findOne({email: user}, (err, doc)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        doc.password = password;
        doc.save();
        res.send(200).json({
            status: 'success',
            msg:'Reset successfull',
            //user: user,
        });
    });
});

router.get('/reset/*', (req, res)=>{
    let url = req.originalUrl.split("/");
    let token = url[url.length-1];
    console.log(token)
    client.get(token, (err, user)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(user===null){
            res.json({
                msg:'Link invalid'
            });
            return;
        }
        console.log(user);
        /*await*/ client.del(token);
        res.send(200).json({
            msg:'Reset link okay',
            //user: user,
        });
    });
});


router.post('/update', (req, res)=>{
    const { user, password } = req.body;
    User.findOne({email: user}, (err, doc)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        doc.password = password;
        doc.save();
    });
});

router.post('/test', verifyToken, (req, res)=>{
  console.log("test");
  res.json({
    msg: 'Protected url'
  })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            'status': 'failure',
            'msg': "Missing Fields"
        });
        return
    }
    User.findOne({email, password})
        .then(user => {
            console.log(email, password);
            if(!user){
                res.status(200).json({status: 'failure', msg: 'Access Denied '});
                return;
            }
            jwt.sign({email}, process.env.KEY, { expiresIn: "30d" }, (er, token) => {
                if (er) {
                    console.log(er);
                    res.send(500);
                    return;
                }
                res.json({
                    status: 'success',
                    msg: 'Access Granted',
                    token,
                });
              });
        })
        .catch(err => res.status(500))
});

router.post('/verify', (req, res) => {
    const { email, password, otp } = req.body;

    if(!email || email.slice(-11, )!=='somaiya.edu' || password.length < 8) {
        res.json({
            'status': 'failure',
            'msg': 'Invalid Fields'
        });
        return
    }

    LoginData.findOne({email, password, otp})
        .then(user => {
            if(!user)
                res.status(200).json({'status': 'failure', 'msg': 'Check your OTP'});
            else {
                User.findOne({email, password})
                .then((result) => {
                    if (result) {
                        res.json({
                            'status': 'failure',
                        'msg': 'Already verified. Proceed to sign in',});
                        return
                    }
                    let shape = ["squares", "isogrids", "spaceinvaders"];
                    let numberColours = [2,3,4];
                    let theme = ["frogideas","heatwave","sugarsweets","daisygarden","seascape","berrypie","bythepool"];
                    const newUser = new User({
                        email, password,
                        profilePic: `https://www.tinygraphs.com/${_.sample(shape)}/${email}?theme=${_.sample(theme)}&numcolors=${_.sample(numberColours)}&size=220&fmt=svg`
                    });
                    newUser.save()
                        .then(() => {
                            jwt.sign({email}, process.env.KEY, { expiresIn: "30d" }, (er, token) => {
                                if (er) {
                                    console.log(er);
                                    res.send(500);
                                    return;
                                }
                                res.json({
                                    'status': 'success',
                                    'msg': 'OTP verified',
                                    token,
                                });
                            });
                        })
                        .catch(err => {console.log(err);res.status(500)});
                })
                .catch(err => {console.log(err);res.status(500)})
            }
        })
        .catch(err => {console.log(err);res.status(500)});
})

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const otp = otpGenerator.generate(6, { specialChars: false });
    console.log(otp);
    console.log(email, password, email.slice(-11));

    if(!email || email.slice(-11)!='somaiya.edu' || password.length < 8) {
        console.log("error");
        res.json({
            'status': 'failure',
            'msg': "Invalid Fields"
        })
        return
    }
    console.log(User);
    User.find({email})
        .then(user => {
            console.log("creating user");
            if(user.length>0){
                res.json({
                    'status': 'failure',
                    'msg': "Email already exists"
                });
                return;
            }
            else {
                console.log("creating user");
                const newlogindata = new LoginData({email, password, otp});
                newlogindata.save()
                .then(() => {
                    const emailId = process.env.EMAIL;
                    const password = process.env.PASSWORD;
                    var transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth:{
                            user: emailId,
                            pass: password
                        },
                        port: 465,
                        secureConnection: true,
                        });
                    var mailOptions = {
                        from: emailId,
                        to: email,
                        subject: "Invitation code for SIH internal hackathon",
                        html: `<html>
                        <body>
                            <p>Hey,
                            <br>Here is the OTP: ${otp}</br>
                            </p>
                        </body>
                        </html>`
                    }

                    transporter.sendMail(mailOptions, function(err){
                        if(err){
                            res.json({
                                'status': 'failure',
                                'msg':'Failed to send mail'
                            });
                            throw(err);
                        }
                    });
                    transporter.close();

                    res.json({
                        'status': 'success',
                        'msg': "Check your mail for OTP"
                    })
                })
                .catch(err => {console.log(err); res.json({
                    'status': 'failure',
                    'msg': "Invalid Fields"
                });})
            }
        })
        .catch(err =>  {console.log(err); res.json({
            'status': 'failure',
            'msg': "Invalid Fields"
        });})
})


router.post('/logout', verifyToken,(req,res)=>{
    client.rpush(blacklistedTokens, verifyToken, redis.print, (err, resp)=>{
      if(err){
        res.json({
          'msg': 'Unable to logout',
          'status': "failure",
        });
        return;
    }
    res.json({
        'msg': 'Successfully logged out',
        'status': "success",
    })
    });
  });

module.exports = router;
