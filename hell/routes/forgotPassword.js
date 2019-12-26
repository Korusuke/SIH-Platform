const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const emailId = process.env.EMAIL;
const password = process.env.PASSWORD;
const redis = require('redis');
const EXPIRE_IN = 60*60; // 1 hr

const crypto = require('crypto');

const User = require('../models/user.model');

const client = redis.createClient({
  host: process.env.REDIS_KA_THING,
  port: 6379
});
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

router.post('/',(req,res)=>{
  const { email } = req.body;
  console.log(email);
  if(email===''){
    res.json({
      msg: 'Email ID not present'
    });
    return;
  }
  User.findOne({email}, (err, user)=>{
    if(err){
      console.log(err);
      res.send(500);
      return;
    }
    if(user===null){
      console.log("User not present");
      res.json({
        msg: 'Check Email-ID and retry'
      });
      return;
    }
    let token = crypto.randomBytes(32).toString('hex');
    console.log(user.email, token);
    
    client.set(token, user.email, 'EX', EXPIRE_IN, (err, result)=>{
      if(err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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
      to: user.email,
      subject: "OTP for password reset",
      html: `<html>
      <body>
          <p>Hey,
          <br>A password reset request has been initiated for your account from the address ${ip}.<br>
          <br>Here is the link to reset your password: ${process.env.REACT_CLIENT_APP_URL}/reset/${token}</br>
          <br>The link will expire in an hour</br>
          <br>
          <br>If you don't wish to reset your password, disregard this email and no action will be taken.</br>
          <br>Contact sih-kjsce@somaiya.edu if you face any issues.</br>
          </p>
      </body>
      </html>`
    }
    transporter.sendMail(mailOptions, function(err){
      if(err){
        res.json({
            'msg':'Failed to send mail'
        });
        throw(err);
      }
      console.log('Mail sent succesfully');
      res.json({
          msg: 'Check your mail for reset link'
      });
    });
    transporter.close();
    });
  });
});

module.exports = router;