



const mongoose = require("mongoose")
const User = require("./userModel")

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        trim: true,
        require: [true, 'user_id is required']
    },

    balance: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true})

const Wallet = new mongoose.model("Wallet", walletSchema)

module.exports = Wallet