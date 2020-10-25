const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const Team = mongoose.model('Teams');

router.get('/teams',ensureAuthenticated,(req,res)=>{
    const { category } = req.user;
    if(category=='manager'){
        Team.find({ manager:req.user.email },(err,results)=>{
            if(err)
                throw err;
            res.render('showTeams',{category,results});
        })
    }
    else if(category=='employee'){
        Team.findOne({id:req.user.belongToTeam},(err,results)=>{
            if(err)
                throw err;
            res.render('showTeams',{category,results});
        })
    }
})

module.exports = router;