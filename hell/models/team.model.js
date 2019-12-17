const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    TeamName: {type: String},
    TeamId: {type: String},
    Members: [String],
    Leader: {type: String},
    InviteCode: {type: String},
    Mentor: {type: String},
    StarredPS: [String]
}, {
    timestamps: true,
});

const team = mongoose.model('team', teamSchema);

module.exports = team;