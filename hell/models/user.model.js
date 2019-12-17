const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: {type: String},
    MiddleName: {type: String},
    LastName: [String],
    Email: {type: String},
    Phone: {type: Number},
    Gender: {type: String},
    DOB: {type: Date},
    RollNo: {type: Number},
    Year: {type: String},
    Department: {type: String},
    Division: {type: String}
}, {
    timestamps: true,
});

const user = mongoose.model('user', userSchema);

module.exports = user;