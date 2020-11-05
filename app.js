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

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Server started on port ${port}...`))