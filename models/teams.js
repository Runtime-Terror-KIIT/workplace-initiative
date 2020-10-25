const mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    manager:{
        type:String,
        required:true
    },
    members:[{
        type:String,
        required:true
    }],
    points:{
        type:Number
    },
    rewards:{
        type:String
    }
})

module.exports = new mongoose.model('Teams',teamSchema);