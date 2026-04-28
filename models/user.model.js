const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    phone: {type: String, unique: true},
    email: {type: String, unique: true},

    role: {
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);