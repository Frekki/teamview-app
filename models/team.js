const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const config = require('../config/database');

// Team Schema
const TeamSchema = mongoose.Schema({
    teamName: {           //text
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    sprint: [{
        sprintNumber:{
            type: Number
        },        
        
        spAchieved: {
            type: Number,
            required: true
        },
        
        spEstimated: {
            type: Number,
            required: true
        }
    }],
    completedAt: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
    // _creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // }
});

const Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.getTeamById = (id, callback) => {
    Team.findById(id, callback);
}

module.exports.getTeamByTeamname = (teamName, callback) => {
    const query = {teamName: teamName};
    Team.findOne(query, callback);
}

module.exports.addTeam = (newTeam, callback) => {
    newTeam.save(callback);
}

module.exports.addSprint = (teamName, callback) => {
    teamName.findOneAndUpdate(teamName, callback);
    // teamName.save(callback);
}