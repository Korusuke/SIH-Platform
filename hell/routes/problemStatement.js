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

router.get('/all_labels', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    // console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;
    //const psid = req.query.psid;
    if (!email) {
        return res.json([])
    }
    User.findOne({email: email})
        .then(user => {
            console.log('finding labels');
            ///let labels = [];
            let psidlabels = {}

            for (var i in user.labels) {
                
                if(psidlabels[user.labels[i].psid] && psidlabels[user.labels[i].psid].labels){
                    //console.log(user.labels[i].psid)
                    psidlabels[user.labels[i].psid].labels.push({
                        psid: user.labels[i].psid,
                        label: user.labels[i].label,
                        color: user.labels[i].color,
                        deletable: true
                    });
                }
                else{
                    //console.log(user.labels[i].psid)
                    psidlabels[user.labels[i].psid] = {labels:[]}
                    psidlabels[user.labels[i].psid].labels.push({
                        psid: user.labels[i].psid,
                        label: user.labels[i].label,
                        color: user.labels[i].color,
                        deletable: true
                    });
                }
            }
            //console.log(psidlabels['RA25'])
            if(typeof user.teamId!='undefined')
                Team.findOne({'teamId': user.teamId})
                    .then(team => {
                        var members = team.members;
                        User.find({email: {'$in': members}})
                            .then(users => {
                                for(var i in users){
                                    console.log(users[i].email, email, users[i].labels, users[i].email!=email)
                                    if(users[i].email!=email && users[i].labels){
                                        // labels = labels.concat(users[i].labels.filter(
                                        //     l => l.psid==psid
                                        // ));
                                        console.log('E', users[i].email, users[i].labels)
                                        users[i].labels.forEach(e=>{
                                            if( psidlabels[e.psid] && psidlabels[e.psid].labels){
                                                psidlabels[e.psid].labels.push({
                                                    psid: e.psid,
                                                    label:e.label,
                                                    color:e.color,
                                                    deletable: true
                                                });
                                            }
                                            else{
                                                psidlabels[e.psid] = {labels:[]}
                                                psidlabels[e.psid].labels.push({
                                                    psid : e.psid,
                                                    label: e.label,
                                                    color: e.color,
                                                    deletable: true
                                                });
                                            }
                                        })
                                    }
                                }
                                return res.json(psidlabels);
                            }).catch(err => res.json(psidlabels));
                    }).catch(err => res.json(psidlabels));
            else
                return res.json(psidlabels);
        })
        .catch(() => res.status(500));
})

router.get('/labels', (req, res) => {
    // Team.findOne({member})
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    // console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;
    const psid = req.query.psid;
    if (!email || !psid) {
        return res.json([])
    }
    User.findOne({email: email})
        .then(user => {
            console.log('finding labels');
            let labels = [];
            for (var i in user.labels) {
                if(user.labels[i].psid == psid){
                    labels.push({
                        psid: user.labels[i].psid,
                        label: user.labels[i].label,
                        color: user.labels[i].color,
                        deletable: true
                    });
                }
            }
            if(typeof user.teamId!='undefined')
                Team.findOne({'teamId': user.teamId})
                    .then(team => {
                        var members = team.members;
                        User.find({email: {'$in': members}})
                            .then(users => {
                                for(var i in users){
                                    if(users[i].email!=email && typeof users[i].labels!='undefined')
                                        labels = labels.concat(users[i].labels.filter(
                                            l => l.psid==psid
                                        ));
                                }
                                return res.json(labels);
                            }).catch(err => res.json(labels));
                    }).catch(err => res.json(labels));
            else
                return res.json(labels);
        })
        .catch(() => res.status(500));
})

router.post('/labels', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    // console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;
    const { psid, label, color } = req.body;
    User.findOne({email: email})
        .then(user => {
            if(!user || color==label)
                return res.json("Invalid fields");
            if(user.labels.length==0){
                user.labels = [];
            }
            user.labels.push({
                psid,
                label,
                color
            })
            console.log("Adding labels");
            user.save()
                .then(() => {
                    return res.json("Added");
                })
                .catch(res.status(500))
        })
        .catch(err => res.status(500));
})

router.delete('/labels', (req, res) => {
    const decodedData = jwt.decode(req.cookies.token, {complete: true});
    // console.log('Decode:',decodedData)
    const email = decodedData.payload.email || decodedData.payload.Email;
    const { psid, label, color } = req.body;
    User.findOne({email: email})
        .then(user => {
            if(!user)
                return res.json("Label doesn't exist");

            user.labels = user.labels.filter(Label => !(Label.psid===psid && Label.label===label && Label.color===color))
            user.save()
                .then(res.json("Label deleted"))
                .catch(err => res.status(500))
        }).catch(err => res.status(500))
})

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
            comments = comments.map(e=> {
                e.deletable = true;
                return e
            } )

            if(typeof user.teamId!='undefined')
                Team.findOne({'teamId': user.teamId})
                    .then(team => {
                        var members = team.members;
                        User.find({email: {'$in': members}})
                            .then(users => {
                                for(var i in users){
                                    if(users[i].email!=email && typeof users[i].comments!='undefined') {
                                        comments = comments.concat(users[i].comments.filter(
                                            c => c.psid==psid
                                        ));
                                    }
                                }
                                comments = comments.sort((a, b) => {
                                    return new Date(a.time) - new Date(b.time);
                                })
                                console.log(comments)
                                return res.json({comments});
                            }).catch(err => res.json({comments}));
                    }).catch(err => res.json({comments}));
            else
                return res.json({comments});
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
                'profilePic': user.profilePic,
                'time': new Date(),
            })

            user.comments_count += 1;
            user.save()
                .then(() => {

                    let comments = [];
                    for (var i in user.comments) {
                        if(user.comments[i].psid == psid)
                            comments.push(user.comments[i]);
                    }

                    comments = comments.map(e=> {
                        e.deletable = true
                        return e
                    } )

                    if(typeof user.teamId!='undefined')
                        Team.findOne({'teamId': user.teamId})
                            .then(team => {
                                var members = team.members;
                                User.find({email: {'$in': members}})
                                    .then(users => {
                                        for(var i in users){
                                            if(users[i].email!=email && typeof users[i].comments!='undefined')
                                                comments = comments.concat(users[i].comments.filter(
                                                    c => c.psid==psid
                                                ));
                                        }
                                        comments = comments.sort((a, b) => {
                                            return new Date(a.time) - new Date(b.time);
                                        })
                                        return res.json({comments});
                                    }).catch(err => console.log(err));
                            }).catch(err => res.json({comments}));
                    else
                        return res.json({comments});
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
    if (!email || (!comment_id && comment_id!== 0)) {
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


                        let comments = [];
                        for (var i in user.comments) {
                            if(user.comments[i].psid == psid)
                                comments.push(user.comments[i]);
                        }

                        comments = comments.map(e=> {
                            e.deletable = true
                            return e
                        } )

                        if(typeof user.teamId!='undefined')
                            Team.findOne({'teamId': user.teamId})
                                .then(team => {
                                    var members = team.members;
                                    User.find({email: {'$in': members}})
                                        .then(users => {
                                            for(var i in users){
                                                if(users[i].email!=email && typeof users[i].comments!='undefined')
                                                    comments = comments.concat(users[i].comments.filter(
                                                        c => c.psid==psid
                                                    ));
                                            }
                                            comments = comments.sort((a, b) => {
                                                return new Date(a.time) - new Date(b.time);
                                            })
                                            return res.json({comments});
                                        }).catch(err => console.log(err));
                                }).catch(err => res.json({comments}));
                        else
                            return res.json({comments});
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
