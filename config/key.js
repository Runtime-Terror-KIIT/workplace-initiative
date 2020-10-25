const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://prabhu:prabhu123@cluster0.8o6bc.mongodb.net/workplace-initiative?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
    if(err)
        throw err;
    console.log('MongoDB connected...');
});

require('../models/users')
//require('../models/managers')
require('../models/tasks')
require('../models/teams')