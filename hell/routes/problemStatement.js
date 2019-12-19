const express = require('express');
const multer = require('multer');
const ProblemStatement = require('../models/problemStatement.model')
const Team = require('../models/team.model');
const User = require('../models/user.model');
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/submissions')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

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

router.get('/', verifyToken, (req, res) => {
    ProblemStatement.find()
        .then(ProblemStatement => res.json(ProblemStatement))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add_label', verifyToken, (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            }
            const { name, color } = req.body;
})
});

router.post('/ps_add_label', verifyToken, (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            }
            const { psid, label_id } = req.body;
            const filter = {'teamId': user[0].teamId, 'assigned_labels': {psid}, 'labels': {$elemMatch: {'id': label_id}}};
            const update = { $push: {'assigned_labels': {'label_id': label_id}}}
            Team.findOneAndUpdate(filter, update)
                .then(() => res.json("Updated label"))
                .catch(() => res.json("Check if label exists"));
        })
        .catch(() => res.status(500));
})

router.post('/ps_delete_label', verifyToken, (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            }
            const { psid, label_id } = req.body;
            const filter = {'assigned_labels': {psid}};
            const update = { $push: {'assigned_labels': {'label_id': label_id}}}
            Team.findOneAndUpdate(filter, update)
                .then(() => res.json("Failed to update label"))
                .catch(() => res.status(500));
        })
        .catch(() => res.status(500));
})

router.get('/ps_comments', verifyToken, (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            } 
            const { psid } = req.body;
            // Team.find({'teamId': user[0].teamId})
        })
        .catch(() => res.status(500));
});

router.post('/upload',function(req, res) {
    console.log(req.files);
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               console.log(err)
               return res.status(500).json(err)
           } else if (err) {
               console.log(err)
               return res.status(500).json(err)
           }
        console.log("uploaded");
        return res.status(200).send(req.files);
    })
})

module.exports = router;
