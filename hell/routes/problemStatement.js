const express = require('express');
const multer = require('multer');
const ProblemStatement = require('../models/problemStatement.model')
const Team = require('../models/team.model');
const User = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
    
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    //console.log(decodedData)
    //console.log(decodedData.payload.email)
    const email = decodedData.payload.email || decodedData.payload.Email;
    const { psid } = req.query
    console.log(email, psid);
    if (!email || !psid) {
        return res.json({
            'status': 'error',
            'msg': 'Invalid Fields'
        })
    }
    User.findOne({email: email})
        .then(user => {
            console.log('finding comments');
            let comments = [];
            for (var i in user.comments) {
                if(user.comments[i].psid == psid)
                    comments.push(user.comments[i]);
            }
            // console.log(comments)
            comments = comments.map(e=> {
                e.deletable = true
                return e
            } )

            // console.log('AFTER: ', comments)
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
                       // console.log(comments);
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
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('post')
    const email = decodedData.payload.email || decodedData.payload.Email;
    const { psid, comment } = req.body;
    if (!email || !psid || !comment) {
        return res.json({
            'status': 'success',
            'msg': 'Invalid Fields'
        })
    }

    console.log(psid, comment)

    

    User.findOne({email: email})
        .then(user => {
            console.log("user found");
            console.log(comment)
            if(user.firstName && user.lastName)
                comment.author = `${user.firstName} ${user.lastName}`
            else
                comment.author = email

            console.log(comment)
            user.comments.push({
                'psid': psid,
                'id': user.comments_count,
                'comment': comment,
                'time': new Date(), 
            })
            user.comments_count += 1;
            // console.log(user);
            user.save()
                .then(() => {
                    //console.log('saved', user)

                    let comments = [];
                    for (var i in user.comments) {
                        if(user.comments[i].psid == psid)
                            comments.push(user.comments[i]);
                    }

                    comments = comments.map(e=> {
                        e.deletable = true
                        return e
                    } )
                    
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
                                
                            }).catch(err => res.status(500));
            
                    console.log(comments);
                    res.json({
                        'status': 'success', 
                        'msg': 'Comment added',
                        'comments': comments
                    });
                })
                .catch(err => res.status(500))
        })
        .catch(() => res.status(500));
});

router.delete('/comments', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    console.log('delete')
    const email = decodedData.payload.email || decodedData.payload.Email;
    
    const { comment_id, psid } = req.body;
    if (!email || !comment_id) {
        return res.json({
            'status': 'success',
            'msg': 'Invalid Fields'
        })
    }
    User.findOne({email: email})
        .then(user => {
            
            user.comments = user.comments.filter((e)=>e.id!=comment_id);
            console.log(user.comments)
            user.save()
                .then(() => {
                    
                        // console.log('saved', user)
    
                        let comments = [];
                        for (var i in user.comments) {
                            if(user.comments[i].psid == psid)
                                comments.push(user.comments[i]);
                        }
    
                        comments = comments.map(e=> {
                            e.deletable = true
                            return e
                        } )
                        
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
                                    
                                }).catch(err => res.status(500));
                
                        console.log(comments);
                        res.json({
                            'status': 'success', 
                            'msg': 'Comment deleted',
                            'comments': comments
                        });
                    
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
