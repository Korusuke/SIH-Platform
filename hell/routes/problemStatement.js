const express = require('express');
const ProblemStatement = require('../models/problemStatement.model')
const Team = require('../models/team.model');
const User = require('../models/user.model');
const router = express.Router();
const { verifyToken } = require('./token');

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

module.exports = router;
