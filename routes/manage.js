const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

const Team = mongoose.model('Teams');
const User = mongoose.model('Users');

router.get('/teams/create',ensureAuthenticated,(req,res)=>{
    res.render('createTeams');
})
router.post('/teams/create',(req,res)=>{
    const { name,emailList } = req.body;
    let emps = emailList.split('\r\n');
    Team.countDocuments((err,count)=>{
        let newTeam = new Team({ id:(count+1),name,manager:req.user.email });
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
})

module.exports = router;