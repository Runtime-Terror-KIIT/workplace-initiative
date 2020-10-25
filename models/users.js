const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    password :{
        type: String,
        required: true
    },
    belongToTeam:{
        type: Number
    }
})

module.exports = new mongoose.model('Users',userSchema);