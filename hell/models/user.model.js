const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {type: String},
    middleName: {type: String},
    lastName: [String],
    phone: {type: Number},
    gender: {type: String},
    dob: {type: Date},
    rollNo: {type: Number},
    year: {type: String},
    department: {type: String},
    division: {type: String},
    teamId: {type: String}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
