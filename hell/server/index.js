const express = require('express');
const router = express.Router();

router.use('/',(req,res)=>{
    let ps = {
        'ps': [
            {
                'title': 'PS1',
                'Desc': 'Desc1'
            },
            {
                'title': 'PS2',
                'Desc': 'Desc2'
            },
            {
                'title': 'PS3',
                'Desc': 'Desc3'
            }
        ]
    }
    res.json(ps);
    // res.json("hello");
});

module.exports = router;
