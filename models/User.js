const mongoose = require('mongoose');
const UserSchima = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    activity: {
        lastlogin: {
            type: Date,
            default: Date.now,
        },
        lastlogindevice: {
            type: String,

        },
        loginHistory: [
            {
                logintime: {
                    type: Date,
                    default: Date.now
                },
                ipAddress: {
                    type: String,
                },
                deviceDetails: {
                    type: String,
                }
            }
        ]
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchima)

module.exports = User;