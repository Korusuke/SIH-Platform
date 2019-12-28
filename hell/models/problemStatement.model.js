const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const psSchema = new Schema({
    title: {type: String},
    description: {type: String},
    id: {type: String},
    company: {type: String},
    domain: {type: String},
    category: {type: String},
    youtube: {type: String},
    dataset: {type: String}
}, {
    timestamps: true,
});

const PS = mongoose.model('PS', psSchema);

module.exports = PS;
