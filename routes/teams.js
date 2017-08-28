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

    Team.addTeam(team, (err, teams) =>{
       if(err){
           res.json({success: false, msg: 'Failed to create team'});
       } else {
           res.json({success: true, msg: 'Team created'});
       }
    });
});

router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Team.find({}).then(teams => {
        res.send({teams});
    });

});

module.exports = router;