const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    OTP : String,
    FirstName: {type: String},
    MiddleName: {type: String},
    LastName: [String],
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

const User = mongoose.model('User', userSchema);

module.exports = User;
