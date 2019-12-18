const express = require('express');
const jwt = require('jsonwebtoken');  
const redis = require('redis');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const router = express.Router(); 
const User = require('../models/user.model');
const LoginData = require('../models/logindata.model');

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

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            'status': 'failure',
            'msg':"Missing Fields"
        });
        return
    }
    User.find({email, password})
        .then(user => {
            if(!user){
                res.status(200).json({status: 'success'});
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
                    msg: 'Passwords match',
                    token,
                });
              });
            
        })
        .catch(err => res.status(500));
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

    LoginData.find({email, password, otp})
        .then(user => {
            if(user){
                console.log(user);
                User.find({email, password})
                    .then((result) => {
                        if (result.length!=0) {
                            res.json({
                                'status': 'failure',
                            'msg': 'Already verified. Proceed to sign in',});
                            return
                        }
                        const newUser = new User({email, password});
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
            else
                res.status(200).json({'status': 'failure', 'msg': 'OTP already verified'});  
        })
        .catch(err => {console.log(err);res.status(500)});
})

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const otp = otpGenerator.generate(6, { specialChars: false });
    
    console.log(email, password, email.slice(-11));

    if(!email || email.slice(-11)!='somaiya.edu' || password.length < 8) {
        res.json({
            'status': 'failure',
            'msg': "Invalid Fields"
        })
        return
    }

    User.find({email})
        .then(user => {          
            if(user.length>0){
                res.json({
                    'status': 'failure',
                    'msg': "Email already exists"
                });
                return;
            }
            else {
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
                    
                    const team = "Team_Probably";
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
                .catch(err => {res.status(500); console.log(err);})
            }      
        })
        .catch(err => res.status(500));
    
})

router.post('/logout',verifyToken, (req,res)=>{
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
