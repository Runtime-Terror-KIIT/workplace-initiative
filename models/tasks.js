const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    dueDate:{
        type:Date,
    },
    manager:{
        type: String,
        required: true
    },
    team:{
        type: Number,
        required: true
    },
    points:{
        type: Number,
        required: true
    },
    rewards:{
        type:String
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = new mongoose.model('Tasks',taskSchema);