const express = require('express');
const router = express.Router();

require('dotenv').config();

router.delete('/', (req, res)=>{
    const { email, key, col } = req.body;
    if (email != process.env.EMAIL && key != process.env.KEY)
        return res.json({
            'status': 'failure', 
            'msg': 'Invalid Credentials'
        })
    if (!col)
        return res.json({
            'status': 'failure',
            'msg': 'Invalid Fields',
        })
    try {
        var collection = require(`../models/${col}.model`)
        collection.deleteMany({})
            .then(() => {
                res.json({
                    'status': 'success',
                    'msg': 'Collection deleted successfully'
                })
            })
    } catch(err) {
        return res.json({
            'status': 'failure',
            'msg': 'Delete collection failed'
        })
    }
})


module.exports = router;
