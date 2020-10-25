const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
const User = require('../models/users');
const express = require('express');

module.exports = function(passport){
    passport.use(new LocalStrategy({ usernameField: 'email' },(email,password,done)=>{
        //Match User
        User.findOne({ email: email },(err,result)=>{
            if(!result)
                return done(null,false,{ message: 'User is not registered.' });
            
            //Match Password
            bcrypt.compare(password,result.password,(err,isMatch)=>{
                if(err)
                    throw err;
                if(isMatch)
                    return done(null,result);
                else
                    return done(null,false,{ msg: 'Passowrd is incorrect' })
            })
            
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}