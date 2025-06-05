

const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")


const handleMoneyTransfer = async (req, res)=>{

  try {

    console.log(req.user)
    
     const {_id, email, sender, receiver, balance, amount } = req.body 
        
        // find the sender by email
      const senderUser = await User.findOne({ email })
        // req.user?.email
      if(!senderUser){
        return res.status(404).json({message: "User account not found"})
      }
  

      const senderWallet = await Wallet.findOne({user_id: senderUser?._id})

      if(!senderWallet){
        return res.status(404).json({message: "wallet not found"})
      }

      // find receiver by email
      const receiverUser = await User.findOne({email:req.body.receiver })
   

      if(!receiverUser){
        return res.status(404).json({message: "account not found"})
      }

      const receiverWallet = await Wallet.findOne({user_id: receiverUser._id })
         
      if(!receiverWallet){
        return res.status(404).json({message: "Your wallet not found4"})
      }
        

        if(senderWallet.balance < amount){
             return res.status(400).json({message: "Insufficient balance"})
        }


      senderWallet.balance -= Number(amount)
      
      receiverWallet.balance += Number(amount)

     await senderWallet.save()
     await receiverWallet.save()

      await new Transaction({ sender_id: sender?._id, receiver_id: receiver?._id, sender, receiver, amount, type: 'debit', Date: new Date }).save()

    await new Transaction({ sender_id: sender?._id, receive_id: receiver?._id, sender, receiver, amount, type: 'credit' }).save()



    return res.status(200).json({message: "Transaction successful", senderWallet, senderUser, receiverWallet, senderUser})

        
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

    
}


const handleFundWallet = async (req, res)=>{

    try {

      console.log(req.user)
        
    const {email, amount} = req.body

     const user = await User.findOne({ email })

    if(!user){
       return res.status(404).json({message: "User account not found"})
    }
    // fund wallet
    const wallet = await Wallet.findOne({ user_id: user?._id })


    if (!wallet){
      return res.status(404).json({ message: "Wallet not found for this user" });
    }


    wallet.balance += Number(amount)

    await wallet.save()

    return res.status(200).json({ message: "Funding successful",
      user: {
        email: user.email,
        balance: wallet.balance}})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const handleGetUserWallet = async (req, res)=>{

  try {

    console.log(req.user)
    
      const { user_id } = req.body

    const wallet = await Wallet.findOne({user_id})

    if(!wallet){
        return res.status(404).json({message: "User account not found"})
    }

    return res.status(200).json({messsage: "successful", wallet})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

// get all users past transaction 
const handleGetAllTransactions = async (req, res)=>{

   try {

    console.log(req.user)
  
     const transaction = await Transaction.find()

       if(!transaction){
        return res.status(404).json({message: "No transaction found"})
    }

    return res.status(200).json({message: "successful", transaction})

   } catch (error) {
    return res.status(500).json({message: error.message})
   }
}


// get user past transactions
const handleUserTransactions =  async (req, res)=>{

   try {

     console.log(req.user)
    
     const { user_id, sender_id, receiver_id } = req.body

     const user = await Wallet.findOne({user_id})

      if(!user){
        return res.status(404).json({message: "Wallet not found"})
    }

    const transaction = await Transaction.findOne({
      $or: [
        { sender: sender_id },
        { receiver: receiver_id }
      ]})

    if(!transaction){
         res.status(404).json({message: "Transaction details not found"})
    }

    return res.status(200).json({message: "successful", transaction, user})

   } catch (error) {
    return res.status(500).json({message: error.message})
   }
 }


 module.exports = {
    handleMoneyTransfer,
    handleFundWallet,
    handleGetUserWallet,
    handleGetAllTransactions,
    handleUserTransactions
 }