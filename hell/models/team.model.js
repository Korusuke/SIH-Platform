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
    submission: {
        title: String,
        domain: String,
        company: String,
        category: String,
        description: String,
        number: String,
        link: String,
        scores: {
            novelty: {type: Number, min: 0, max: 10},
            feasibility: {type: Number, min: 0, max: 10},
            complexity: {type: Number, min: 0, max: 10},
            methodology: {type: Number, min: 0, max: 20},
            tech_stack: {type: Number, min: 0, max: 20},
            team_comp: {type: Number, min: 0, max: 10},
            presentation: {type: Number, min: 0, max: 10},
            remarks: {type: String},
        },
        reviewer: {
            name: String,
            email: String,
            done: {type: Boolean, default: false}
        }
    },
    mentor: [
        {
            name: String,
            email: String, 
        }
    ]
}, {
    timestamps: true,
});

const team = mongoose.model('team', teamSchema);

module.exports = team;
