const mongoose = require('mongoose');
const UserSchima = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    lastlogin:{
        type:Date,
        default:Date.now,
    },
    lastlogindevice:{
        type:String,

    },
    loginHistory:[
        {
        logintime:{
        type:Date,
        default:Date.now
        },
        ipAddress:{
            type:String,
        },
        deviceDetails:{
            type:String,
        }
    }
    ]
},{timestamps:true})

const User = mongoose.model ('User',UserSchima)

module.exports = User;