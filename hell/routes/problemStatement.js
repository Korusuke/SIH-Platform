const express = require('express');
const ProblemStatement = require('../models/problemStatement.model')
const router = express.Router();

// const db = require('./dbconnection');

router.get('/', (req, res) => {
    console.log(ProblemStatement);
    ProblemStatement.find()
        .then(ProblemStatement => res.json(ProblemStatement))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

