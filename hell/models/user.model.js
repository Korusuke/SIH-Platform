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
    lastName: {type: String},
    phone: {type: Number},
    gender: {type: String},
    dob: {type: Date},
    rollNo: {type: Number},
    year: {type: String},
    department: {type: String},
    division: {type: String},
    teamId: {type: String},
    profilePic: {type: String},
    comments: [
        {
            psid: String,
            id: Number,
            deletable: {type: Boolean, default: false},
            comment: {
                author: String,
                message: String
            },
            time: Date
        }
    ],
    labels: [
        {
            psid: String,
            label: String,
            color: String
        }
    ],
    comments_count: {type: Number, default: 0}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
