const express = require('express');
const ProblemStatement = require('../models/problemStatement.model')
const router = express.Router();

router.get('/', (req, res) => {
    ProblemStatement.find()
        .then(ProblemStatement => res.json(ProblemStatement))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
