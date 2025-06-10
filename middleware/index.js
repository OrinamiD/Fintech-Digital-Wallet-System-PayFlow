
const joi = require("joi")
const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")
const jwt = require("jsonwebtoken")
const { validEmail } = require("../sendEmails/registrationEmail")




const validateRegistration = async (req, res, next)=>{

    const { name, email, password, walletBalance } = req.body

    const errors = []

    if(!name){
            errors.push("Enter your name")
        }
        
    
        if(!email){
             errors.push("Enter your email")
        }

        if(!validEmail(email)){
             errors.push("Invalid Email")
        }
    
        if(!password){
             errors.push("Enter your password")
        }
    
          if(password.length  < 8 ){
           errors.push("password require minimum of 8 characters")
        }

        if(errors.length > 0 ){
            return res.status(401).json({message: errors})
        }

        const signupSchema = Joi.object({
      email: Joi.string()
        .min(6)
        .max(60)
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),

      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/)
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
        }),
    });

    const  { error } = signupSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }
                   
next()

}

const validateLogin = async (req, res, next)=>{

     const { email, password } = req.body

     const errors = []

      if(!email){
        errors.push("Enter your email")
            
        }

        if(!password){
         errors.push("Enter your password")
        }

        if(errors.length > 0 ){
            return res.status(400).json({message: errors})
        }
next()

}

const auth = async (req, res, next)=>{

 try {
    
       const token = req.header("Authorization")

       if(!token){
        return res.status(401).json({Message: "Access denied"})
       }

    const splitToken = token.split(" ")

    const realToken = splitToken[1]

    const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`)

    if(!decoded){
         return res.status(401).json({Message: " Please login"})
    }

    const user = await User.find(decoded?.id)

    if(!user){
        return res.status(404).json({message: "Incorrect details"})
    }

     req.user = user

 next()

 } catch (error) {
    return res.status(500).json({message: error.message})
 }


}

const validateFogotPaasword = async (req, res, next)=>{

     const {email, password } = req.body

     const errors = []

    if(!email){
          errors.push("Enter your email")
            
    }

    if(!password){
          errors.push("Enter your password")
            
    }

    next()
}

const validateResetPassword = async (req, res, next)=>{

    const {password} = req.body

    const errors = []

    if(!password){
       errors.push("Please provide your password") 
}

if(errors.length > 0 ){
    return res.status(500).json({message: errors})
}
next()

}

const validateFundingWallet = async (req, res, next)=>{

   const { email, amount } = req.body 

    const errors = []

    if(!email){
        errors.push("Please provide your email")
    }

      if(!amount){
        errors.push("Please provide the amount")
    }


    if(amount < 100 ){
      errors.push("Amount must be greater than 99 naira")
    }


    if(errors.length > 0 ){
        return res.status(200).json({message: errors})
    }

    next()
}
const validateMoneyTransfer = async (req, res, next)=>{

     const {_id, email, sender, receiver, balance, amount } = req.body

     const errors = []

     if(!email){
        errors.push("please, provide your email")
     }

      if(!sender){
        errors.push("please, provide sender email")
     }

     if(!receiver){
        errors.push("please, provide receiver's email")
     }

      if(!amount){
        errors.push("please, provide your amount")
     }
     
     if(amount <= 999){
      errors.push("minimum amount to send is 1000 naira")
     }

    if( balance < amount){
      errors.push("Insufficient amount")
        }

     if(errors.length > 0 ){
        return res.status(200).json({message: errors})
     }

     next()
}

module.exports = {
    validateRegistration,
    validateLogin,
    auth,
    validateFogotPaasword,
    validateResetPassword,
    validateFundingWallet,
    validateMoneyTransfer

}