



const mongoose = require("mongoose")
const Wallet = require("./walletModel")

transactionSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Wallet,
        trim: true,
        require: true
    },

    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
         ref: Wallet,
         trim: true,
         require: true,
        },

    amount: {
        type: Number,
        trim: true,
        default: 0,
        
    },

    type: {
        type: String,
        trim: true,
    },


}, {timestamps: true})


const Transaction = new mongoose.model("Transaction", transactionSchema)


module.exports = Transaction

