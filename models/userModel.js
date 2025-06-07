



const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: [true, 'email is required'],
        unique: true,
        lowercase: true,

    },

    password: {
        type: String,
        trim: true,
        require: [true, 'password is required'],
        minLength: [8, ' email must have 8 characters'],


    },

    role: {
        type: String,
        default: "user"
    }
   
}, {timestamps: true})


const User = new mongoose.model("User", userSchema)

module.exports = User