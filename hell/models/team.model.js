const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {type: String},
    teamId: {type: String},
    members: [String],
    leader: {type: String},
    inviteCode: {type: String},
    mentor: {type: String},
    starredPS: [String],
    labels: [
        {
            id: Number,
            name: String,
            color: String
        }
    ],
    assigned_labels: [
        {
            psid: String,
            labels: [Number]
        }
    ]
}, {
    timestamps: true,
});

const team = mongoose.model('team', teamSchema);

module.exports = team;