const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');    
const Team = require('../models/team.model');
const jwt = require('jsonwebtoken');

router.post('/', (req,res)=>{
  const emailId = process.env.EMAIL;
  const password = process.env.PASSWORD; 
  // person to be invited
  var member = req.body.email;
  // person sending invitation;
  let sender = (jwt.decode(req.token))?jwt.decode(req.token).Email.slice(-11):req.body.Email;
  var transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
      user: emailId,
      pass: password
  },
  port: 465,
  secureConnection: true,
  });    
  let code = otpGenerator.generate(6, { specialChars: false });
  console.log(sender);
  Team.find({members: [sender]}, (err, doc)=>{
    if(err){
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(doc);
    sender = sender.replace(".", " ");
    let teamName = doc.teamName;
    var mailOptions = {
      from: emailId,
      to: member,
      subject: "Invitation code for SIH internal hackathon",
      html: `<html>
      <body>
          <p>Hey,
          <br>You have been invited by ${sender} to join the team ${teamName}.<br>
          <br>Here is the code to join the team: ${code}</br>
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

module.exports = router;