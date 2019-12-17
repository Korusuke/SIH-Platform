const express = require('express');
const router = express.Router();
var otpGenerator = require('otp-generator');    
const { uuidv4 } = require('uuidv4');

const db = require('./dbconnection');

router.post('/', (req, res)=>{
  const { teamName } = req.body;
  const leader = req.body.sender;
  members = [leader];
  inviteCode = otpGenerator.generate(6, { specialChars: false });
  tid = uuidv4(); 
  const doc = {
    teamName,
    leader,
    members,
    inviteCode,
    tid
  };
  res.json({msg: "Sup dawg"});
});

module.exports = router;