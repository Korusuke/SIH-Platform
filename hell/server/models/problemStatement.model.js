const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const psSchema = new Schema({
    Title: {type: String},
    Description: {type: String},
    Number: {type: String},
    Domain: {type: String},
    Category: {type: String},
    Youtube: {type: String},
    Dataset: {type: String}
}, {
    timestamps: true,
});

const PS = mongoose.model('PS', psSchema);

module.exports = PS;
