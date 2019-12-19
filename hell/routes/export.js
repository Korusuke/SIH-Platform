const express = require('express');
const router = express.Router(); 
const { parse } = require('json2csv');

require('dotenv').config();

router.get('/', (req, res)=>{
    const { email, key } = req.body;
    if (email != process.env.EMAIL && key != process.env.KEY)
        return res.json({'status': 'failure', 'msg': 'Invalid Credentials'})
    db = req.query.dbname;
    fields = req.query.fields;
    db = require(`../models/${db}.model`);
    fieldobj = {}
    fields.forEach(el => {
        fieldobj[el]=1
    });
    console.log(fieldobj);
    let query = db.find({}).select(fieldobj);
    query.exec((err, data)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log(data);
        try{
            const csv = parse(data, {fields});
            console.log(csv);
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }
        catch (err) {
            return res.status(500).json({ err });
        }
    });
});

module.exports = router;