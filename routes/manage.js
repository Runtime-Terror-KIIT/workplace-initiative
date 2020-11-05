const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const Team = mongoose.model('Teams');
const User = mongoose.model('Users');
const Task = mongoose.model('Tasks');

router.get('/teams/create',ensureAuthenticated,(req,res)=>{
    res.render('createTeams');
})
router.post('/teams/create',(req,res)=>{
    const { name,emailList } = req.body;
    let emps = emailList.split('\r\n');
    Team.findOne({}).sort({id: -1}).exec((err,count)=>{
        if(err)
            throw err;
        let c;
        console.log(count)
        if(!count)
            c=0;
        else
            c=count.id;
        let newTeam = new Team({ id:(c+1),name,manager:req.user.email });
        newTeam.save((err,docs)=>{
            if(err)
                throw err;
            emps.forEach(emp => {
                User.findOne({email:emp, category:'employee'},(err,result)=>{
                    if(err)
                        throw err;
                    if(!result){
                        Team.deleteOne({id:newTeam.id},(err,docs)=>{
                            if(err)
                                throw err;
                        })
                        console.log('Employee doesn\'t exixts');
                    }
                    else{
                        Team.findOneAndUpdate({id:newTeam.id},{$push: {members:emp}},(err,result)=>{
                            if(err)
                                throw err;
                        });
                        User.findOneAndUpdate({email:emp,category:'employee'},{belongToTeam:newTeam.id},(err,doc)=>{
                            if(err)
                                throw err;
                        });
                    }
                })
            });
            res.redirect('/views/teams');
        })
    })
    /**
     * Team.countDocuments((err,count)=>{
        if(err)
            throw err;
    })
     */
})

router.get('/teams/delete/:id',ensureAuthenticated,(req,res)=>{
    Team.deleteOne({id:req.params.id},(err)=>{
        if(err)
            throw err;
        res.redirect('/views/teams');
    })
})

router.get('/tasks/create',ensureAuthenticated,(req,res)=>{
    Team.find({manager:req.user.email},(err,results)=>{
        if(err)
            throw err;
        res.render('createTasks',{results});
    })
    
})

router.post('/tasks/create',(req,res)=>{
    const { title,description,dueDate,team,points,rewards } = req.body;
    const newTask = new Task({ title,description,dueDate,manager:req.user.email,team,points,rewards,completed:false });
    newTask.save((err,result)=>{
        if(err)
            throw err;
        res.redirect('/views/tasks');
    })
})

router.get('/tasks/submit/:team/:title',ensureAuthenticated,(req,res)=>{
    Task.findOneAndUpdate({team:req.params.team,title:req.params.title},{completed:true},(err,result)=>{
        if(err)
            throw err;
        Team.findOneAndUpdate({id:req.params.team},{points:result.points},(err,docs)=>{
            if(err)
                throw err;
            res.redirect('/views/tasks');
        })
    })
})

module.exports = router;