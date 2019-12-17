const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');    

router.post('/', (req,res)=>{
  const emailId = process.env.EMAIL;
  const password = process.env.PASSWORD; 
  var member = req.body.email;
  var {sender} = req.body;
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
  // Fetch from db later
  const team = "Team_Probably";
  var mailOptions = {
    from: emailId,
    to: member,
    subject: "Invitation code for SIH internal hackathon",
    html: `<html>
    <body>
        <p>Hey,
        <br>You have been invited by ${sender} to join the team ${team}.<br>
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

module.exports = router;