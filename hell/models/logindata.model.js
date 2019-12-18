const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logindataSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp : String
}, {
    timestamps: true,
});

const LoginData = mongoose.model('LoginData', logindataSchema);

module.exports = LoginData;
