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


router.get('/', (req, res) => {
    ProblemStatement.find()
        .then(ProblemStatement => res.json(ProblemStatement))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add_label', (req, res) => {
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

router.get('/comments', (req, res) => {
    const email = req.query.email;
    const { psid } = req.query
    console.log(email, psid);
    if (!email || !psid) {
        return res.json({
            'status': 'success',
            'msg': 'Invalid Fields'
        })
    }
    User.findOne({email: email})
        .then(user => {
            console.log('finding comments');
            var comments = [];
            for (var i in user.comments) {
                if(user.comments[i].psid == psid)
                    comments.push(user.comments[i]);
            }
            console.log(comments, user.comments);
            if(user.teamId)
                Team.findOne({'teamId': user.teamId})
                    .then(team => {
                        var members = team.members;
                        for(var i in members) {
                            console.log("fetching member comments");
                            if(members[i]!=email)
                                User.findOne({email: email, comments: {psid: psid}})
                                    .then(user => {
                                        comments = comments.concat(user.comments);
                                    }).catch(err => res.status(500))
                        }
                        console.log(comments);
                    }).catch(err => res.status(500));
            res.json({
                'status': 'success', 
                'msg': 'All comments fetched', 
                'comments': comments
            });
        })
        .catch(() => res.status(500));
});

router.post('/comments', (req, res) => {
    const email = req.body.email;
    const { psid, comment } = req.body;
    if (!email || !psid || !comment) {
        return res.json({
            'status': 'success',
            'msg': 'Invalid Fields'
        })
    }
    User.findOne({email: email})
        .then(user => {
            console.log("user found");
            user.comments.push({
                'psid': psid,
                'id': user.comments_count,
                'comment': comment,
                'time': new Date(), 
            })
            user.comments_count += 1;
            console.log(user);
            user.save()
                .then(() => {
                    res.json({
                        'status': 'success', 
                        'msg': 'All comments fetched', 
                        'comments': comments
                    });
                })
                .catch(err => res.status(500))
        })
        .catch(() => res.status(500));
});

router.delete('/comments', (req, res) => {
    const email = req.body.email;
    const { comment_id } = req.body;
    if (!email || !comment_id) {
        return res.json({
            'status': 'success',
            'msg': 'Invalid Fields'
        })
    }
    User.findOne({email: email})
        .then(user => {
            var comments = [];
            console.log(user.comments);
            for (var i in user.comments) {
                if(user.comments[i].id != comment_id)
                    comments.push(user.comments[i]);
            }
            user.comments = comments;
            console.log(user.comments)
            user.save()
                .then(() => {
                    res.json({
                        'status': 'success',
                        'msg': 'Comment deleted'
                    })
                }).catch(() => res.status(500));
        }).catch(() => res.status(500))
})

router.post('/ps_add_label', (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            }
            const { psid, label_id } = req.body;
            const filter = {
                'teamId': user[0].teamId, 
                'assigned_labels': {psid}, 
                'labels': {
                    $elemMatch: 
                    {
                        'id': label_id
                    }
                }
            };
            const update = { 
                $push: {
                    'assigned_labels': {
                        'label_id': label_id
                    }
                }
            }
            Team.findOneAndUpdate(filter, update)
                .then(() => res.json("Updated label"))
                .catch(() => res.json("Check if label exists"));
        })
        .catch(() => res.status(500));
})

router.post('/ps_delete_label', (req, res) => {
    const email = req.decoded.email;
    User.find({email})
        .then(user => {
            if (user[0].teamId.length=="") {
                res.json("User Doesn't belong to any team");
                return
            }
            const { psid, label_id } = req.body;
            const filter = {
                'assigned_labels': {
                    psid
                }
            };
            const update = {
                $push: {
                    'assigned_labels': {
                        'label_id': label_id
                    }
                }
            }
            Team.findOneAndUpdate(filter, update)
                .then(() => res.json("Failed to update label"))
                .catch(() => res.status(500));
        })
        .catch(() => res.status(500));
})

router.post('/upload', function(req, res) {
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
