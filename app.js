const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const expressejslayout = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('./config/passport')(passport);
require('./config/key');

const app = express();

//Setting a public folder for the styles
app.use(express.static(path.join(__dirname,'/public')));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  maxAge: 3600000,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
  res.locals.success_message = req.flash('success_message');
  res.locals.failure_message = req.flash('failure_message');
  res.locals.error = req.flash('error');
  next();
})

app.use(expressejslayout)
//Setting view-engine to EJS
app.set('view engine','ejs');

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/dashboard',require('./routes/dashboard'));
app.use('/views',require('./routes/views'));
app.use('/manage',require('./routes/manage'));

app.get("/Employee/Teammates", function(req,res){
  res.sendFile(__dirname + "/Teammates.html");
});

app.get("/Employee/Tasks", function(req,res){
  res.sendFile(__dirname + "/Tasks.html");
});

app.get("/Leaderboard", function(req,res){
  res.sendFile(__dirname + "/Leaderboard.html");
});

app.get("/Employee/Rewards", function(req,res){
  res.sendFile(__dirname + "/Rewards.html");
});


app.get("/Chat", function(req,res){
  res.sendFile(__dirname + "/Chat.html");
});

app.get("/Manager/Tasks", function(req,res){
  res.sendFile(__dirname + "/Tasks.html");
});

app.get("/Manager/Create", function(req,res){
  res.send("Create teams");
});

app.get("/Manager/AddEmployee", function(req,res){
  res.send("Add employee");
});

app.get("/Manager/Points", function(req,res){
  res.send( "Assign points");
});

const port=3000||process.env.PORT;
app.listen(port,()=>console.log(`Server started on port ${port}...`))