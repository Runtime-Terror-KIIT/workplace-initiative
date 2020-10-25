const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

//Setting a public folder for the styles
app.use(express.static(path.join(__dirname,'/public')));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Initiating a connection to MySql server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'workplace-initiative'
})

//Setting view-engine to EJS
app.set('view-engine','ejs');

//Connecting to mysql
db.connect((err)=>{
    if(err)
        throw err;
    console.log('Mysql database connected....');
})

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const port=3000||process.env.PORT;
app.listen(port,()=>console.log(`Server started on port ${port}...`))

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/login",function(req,res){
  res.sendFile(__dirname + "/login.html");
});

app.get("/login/Manager",function(req,res){
  res.sendFile(__dirname + "/managerLogin.html");
});

app.post("/login/Manager",function(req,res){
  res.sendFile(__dirname + "/Manager.html");
});

app.get("/login/Employee",function(req,res){
  res.sendFile(__dirname + "/employeeLogin.html");
});

app.post("/login/Employee",function(req,res){
  res.sendFile(__dirname + "/Employee.html");
});

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
