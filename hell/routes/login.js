const express = require('express');
const bcrypt = require('bcrypt')
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

router.post('/reset/:token', (req, res)=>{
    let token = req.params.token;
    let {password} = req.body;
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
            res.json({
                msg: 'Missing parameters',
            });
            return;
        }
        // Change to async sometime in the future
        const hash = bcrypt.hashSync(password, 10);
        updatePass(user, hash)
        .then(()=>{
            client.del(token);
            res.json({
                status: 'success',
                msg:'Reset successful',
            });
        })
        .catch(er=>{console.log(er);res.sendStatus(500);return;})
    });
});

function updatePass(user, password){
    return new Promise((resolve,reject)=>{
        User.findOne({email: user}, (err, doc)=>{
            if(err){
                reject(err);
            }
            doc.password = password;
            doc.save();
            resolve();
        });
    });
}

router.get('/reset/:token', (req, res)=>{
    let token = req.params.token;
    client.get(token, (err, user)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if(user===null){
            res.json({
                status: 'failure',
                msg:'Link invalid'
            });
            return;
        }
        console.log(user);
        res.json({
            status: 'success',
            msg:'Reset link okay',
        });
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

    User.findOne({email})
        .then(user => {
            if(!user){
                res.status(200).json({status: 'failure', msg: 'Access Denied'});
                return;
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                if(res===true){
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
                    }
                else{
                    res.json({
                            status: 'failure',
                            msg: 'Invalid credentials'
                    })
                }
              });

        })
        .catch(err => res.status(500))
});

router.post('/verify', (req, res) => {
    const { email, otp } = req.body;

    if(!email || email.slice(-11, )!=='somaiya.edu' || password.length < 8) {
        res.json({
            'status': 'failure',
            'msg': 'Invalid Fields'
        });
        return
    }

    let password = bcrypt.hashSync(req.body.password, 10);

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

    if(!email || email.slice(-11)!='somaiya.edu' || password.length < 8) {
        console.log("error");
        res.json({
            'status': 'failure',
            'msg': "Invalid Fields"
        })
        return
    }

    User.find({email})
        .then(user => {
            if(user.length > 0){
                res.json({
                    'status': 'failure',
                    'msg': "Email already exists"
                });
                return;
            }
            else {
                let hash = bcrypt.hashSync(password, 10);
                const newlogindata = new LoginData({email, hash, otp});
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
                        from: `SIH KJSCE <${emailId}>`,
                        to: email,
                        subject: "Invitation code for SIH internal hackathon",
                        html: `<html>
                        <body>
                            <p>Hey,
                            <br>Here is the OTP: ${otp}</br>
                            Enter the above OTP to verify your email address.
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
                            return
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
