const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Team = require('../models/team');
const User = require('../models/user');
const {
    ObjectID
} = require('mongodb');

// Add Team
router.post('/addteam', (req, res, next) => {
    let team = new Team({
        teamName: req.body.teamName,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        sprint: [{
            spAchieved: req.body.spAchieved,
            spEstimated: req.body.spEstimated,
            sprintNumber: req.body.sprintNumber = 1
        }]
        // _creator: req.user._id
    });

    Team.addTeam(team, (err, teams) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to create team'
            });
        } else {
            res.json({
                success: true,
                msg: 'Team created',
            });
        }
    });
});

router.put('/addsprint/:id', (req, res, next) => {
    const id = req.params.id;
    // const body = req.body(['spEstimated', 'spAchieved']);
    const teamName = req.body.teamName;

    const team = Team.findById(id);

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Team.updateOne({
        _id: ObjectID("59db7dd4c9030e154cafe011")
    }, {
        $setOnInsert: {
            sprint: [{
                spAchieved: req.body.spAchieved,
                spEstimated: req.body.spEstimated
            }]
        }
    }, {
        upsert: true
    }).then((team) => {
        if (!team) {
            return res.status(404).send();
        }

        res.send({
            team
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    Team.find({}).then(teams => {
        res.send({
            teams
        });
    });

});

module.exports = router;