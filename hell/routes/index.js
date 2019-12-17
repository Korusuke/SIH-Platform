const express = require('express');
const router = express.Router();

router.use('/ps/', require('./problemStatement'));
// router.use('/', require('./login'));

module.exports = router;
