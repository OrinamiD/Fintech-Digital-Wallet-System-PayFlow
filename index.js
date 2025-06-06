

const express = require("express")

const bcrypt = require("bcryptjs")

const dotenv = require("dotenv").config()

const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

const cors = require("cors")

// const cookie = require("cookies-parser")


const routes = require("./routes")
// const cookieparser = require("cookies-parser")

const PORT = `${process.env.PORT}` || 5000

const app = express()

// app.use(cookieparser())

app.use(express.json())

app.use(cors())



 
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("MongoDB connected successfully...")

app.listen(PORT, ()=>{
console.log(`Server running on PORT ${PORT}`)
 })
})


app.use("/api",routes)





//  // get all users in the database

// //  app.get("/all-users", async ( req, res)=>{

// //     const user = await User.find()

// //     return res.status(200).json({message: "successful", user})
// //  })

// // check all wallet in the database

// //  app.get("/all-wallet", auth, async (req, res)=>{

// //     const users = await Wallet.find()

// //      return res.status(200).json({message: "successful", users})
// //  })

