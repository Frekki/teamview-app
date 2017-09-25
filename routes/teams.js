const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Team = require('../models/team');
const User = require('../models/user');

// Add Team
router.post('/addteam', (req, res, next) => {
    let team = new Team({
        teamName: req.body.teamName,
        sprintNumber: req.body.sprintNumber,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        spAchieved: req.body.spAchieved,
        spEstimated: req.body.spEstimated
        // _creator: req.user._id
    });

    Team.addTeam(team, (err, teams) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to create team' });
        } else {
            res.json({ success: true, msg: 'Team created' });
        }
    });
});

router.patch('/addsprint', (req, res, next) => {
    // Team.addSprint({
    //     $set: {
    //         teamName: Team.findOne(req.body.teamName),
    //         sprintNumber: req.body.sprintNumber,
    //         spEstimated: req.body.spEstimated,
    //         spAchieved: req.body.spAchieved
    //     }
    //     }).then((team) => {
    //         if (!team) {
    //             return res.status(404).send();
    //         }

    //         res.send({
    //             team
    //         });
    //     }).catch((e) => {
    //         res.status(400).send();
    //     });
    const teamName = req.body.teamName;
    
    Team.getTeamByTeamname(teamName, (err, team) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add sprint' });
        } else {
            const query = {
                sprintNumber: req.body.sprintNumber,
                spEstimated: req.body.spEstimated,
                spAchieved: req.body.spAchieved
            }
            
            Team.addSprint(query, (err, team) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to create team' });
                } else {
                    res.json({ success: true, msg: 'Team created' });
                }
            });
        }
    });

    // Team.addSprint(teamName, (err, team) => {
    //     if (err) {
    //         res.json({ success: false, msg: 'Failed to add sprint' });
    //     } else {
    //         Team.collection('teams').findOneAndUpdate({
    //             sprintNumber: req.body.sprintNumber,
    //             spEstimated: req.body.spEstimated,
    //             spAchieved: req.body.spAchieved
    //         });
    //         res.json({ success: true, msg: 'Sprint added' });
    //     }
    // });
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Team.find({}).then(teams => {
        res.send({ teams });
    });

});

module.exports = router;