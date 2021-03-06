const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const Team = mongoose.model('Teams');
const User = mongoose.model('Users');
const Task = mongoose.model('Tasks');

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

router.get('/tasks',ensureAuthenticated,(req,res)=>{
    const { category } = req.user;
    if(category=='manager'){
        Task.find({ manager:req.user.email },(err,results)=>{
            if(err)
                throw err;
            console.log(results)
            let teamName = [];
            results.forEach(result=>{
                Team.findOne({id:result.team},(err,docs)=>{
                    if(err)
                        throw err;
                    console.log(docs)
                    if(docs!=null)
                        teamName.push(docs.name);
                })
            })
            res.render('showTasks',{category,resultTask:results,teamName});
        })
    }
    if(category=='employee'){
        User.findOne({email:req.user.email},(err,docs)=>{
            if(err)
                throw err;
            Task.find({team: docs.belongToTeam},(err,resultTask)=>{
                if(err)
                    throw err;
                if(typeof resultTask[0]!='undefined'){
                    Team.findOne({id:resultTask[0].team},(err,resultTeam)=>{
                        if(err)
                            throw err;
                        res.render('showTasks',{category,resultTask,resultTeam});
                    })
                }
                else
                    res.render('showTasks',{category});
            })
        })
    }
})

router.get('/leaderboard',(req,res)=>{
    Team.find({}).sort({points:-1}).exec((err,results)=>{
        if(err)
            throw err;
        res.render('leaderBoard',{results});
    })
})

module.exports = router;