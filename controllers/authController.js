


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")
const forgotPasswordEmail = require("../sendEmails/forgotPassword")
const { registrationEmail } = require("../sendEmails/registrationEmail")



const handleWelcomeMessage = async (req, res)=>{
   try {
    
     return res.status(200).json({message: "Welcome to Fintech Digital Wallet System "})

   } catch (error) {
     return res.status(200).json({message: error.message})
   }
}

const handleUserRegistration = async (req, res)=>{

    
        try {
        
            
        const { name, email, password} = req.body
    
    
        const existingUser = await User.findOne({ email })
    
        if(existingUser){
            return res.status(404).json({message: "User account already exist. login"})
        }
    
    
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword
            })
    
             await newUser.save()
    
            const wallet = new Wallet({
                user_id: newUser?._id,
                balance: 0})
                
                await wallet.save()
                

                
                // send email
await registrationEmail(name, email, password)


            return res.status(201).json({message: "Registration successfull",
                newUser:{ name, email },
                wallet
            })
            
    
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

const handleUserLogin = async (req, res)=>{


    try {
  
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({message: "User account not found "})
        }

        const ismatch = await bcrypt.compare(password, user?.password)

        if(!ismatch){
            return res.status(400).json({message: "Incorrect password or email"})
        }

        const accessToken = jwt.sign({user_id: user?._id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "7m"})

        const refreshToken = jwt.sign({user_id: user?._id}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "7d"})


         

        return res.status(200).json({message: "Login successfull",
          user,
          accessToken
        },

        refreshToken
    )

    } catch (error) {
         return res.status(500).json({message: error.message})
    }
    
}

const handleForgotPassword = async (req, res)=>{

   try {

     const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
         return res.status(404).json({message: "User account not found"})
    }

    // send message with token
const accessToken = jwt.sign({user_id: user?._id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "5m"})

await forgotPasswordEmail(email, accessToken)

return res.status(200).json({message: "Please check your email inbox"})

    
   } catch (error) {
    return res.status(500).json({message: error.message})
   }
 }

const handleResetPassword = async (req, res)=>{

    try {
        console.log(user.req)
        
        const {password} = req.body

        const user = await User.findOne({email: req.user?.email})

        if(!user){
            return res.status(404).json({message: "User account not found"})
        }

        const hashedpassword = await bcrypt.hash(password, 12)

        user.password = hashedpassword

        await user.save()

         const accessToken = jwt.sign({user: user_id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "5m"})

         const refreshToken = jwt.sign({user: user_id}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "7d"})

         return res.status(200).json({message: "Password Reset successful", accessToken, user},

            refreshToken
         )

    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

module.exports = {
     handleUserRegistration,
     handleUserLogin,
     handleForgotPassword,
     handleResetPassword,
     handleWelcomeMessage

}
