const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const emailId = process.env.EMAIL;
const password = process.env.PASSWORD;
const redis = require('redis');
const EXPIRE_IN = 60*60; // 1 hr 

const client = redis.createClient();
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});

router.post('/',(req,res)=>{
  const { email } = req.body;
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
    client.set(token, user, 'EX', EXPIRE_IN, (err, result)=>{
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
      from: emailId,
      to: user,
      subject: "OTP for password reset",
      html: `<html>
      <body>
          <p>Hey,
          <br>A password reset request has been initiated from the IP address ${ip}.<br>
          <br>Here is the OTP to reset your password: http://localhost:3000/reset/${token}</br>
          <br>The OTP will expire in an hour</br>
          <br>
          <br>If you don't wish to reset your password, disregard this email and no action will be taken.</br>
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
          msg: 'Check your mail for otp'
      });
    });
    transporter.close();
    });
  });
});

module.exports = router;