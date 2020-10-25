const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureNotAuthenticated } = require('../config/auth')
const router = express.Router();

let User = mongoose.model('Users')
//let manager = mongoose.model('Managers')

router.get('/login',ensureNotAuthenticated,(req,res)=>{
    res.render('loginPage');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        failureRedirect: '/users/login',
        successRedirect: '/dashboard',
        failureFlash: true
    })(req,res,next)
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

//Register route
router.get('/register',ensureNotAuthenticated,(req,res)=>{
    res.render('register');
})

//Submit route for register
router.post('/register',(req,res)=>{
    const { name,email,category,password,confPassword } = req.body
    let err = [];
    if(!name || !email || !category || !password || !confPassword)
        err.push('Please enter all fields...');
    if(password!==confPassword)
        err.push('Passwords don\'t match');
    if(password.length<8)
        err.push('Password should be of at least 8 characters')
    if(err.length>0)
        res.render('register',{ err,name,email,password });
    else{
        User.findOne({ email:email },(err,result)=>{
            if(err)
                throw err;
            if(result){
                err.push('User already exists');
                res.render('register',{ err });
            }
            else{
                let newUser = new User({ name,email,category,password });
                bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err)
                        throw err
                    newUser.password=hash;
                    newUser.save((err,docs)=>{
                        if(err)
                            throw err;
                        req.flash('success_message','Registered successfully, you can log in to continue...');
                        res.redirect('/users/login');
                    })
                }))
            }
        })
    }
})

module.exports = router;