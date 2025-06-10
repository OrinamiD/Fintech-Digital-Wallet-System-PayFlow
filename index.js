

const express = require("express")

const bcrypt = require("bcryptjs")

const dotenv = require("dotenv").config()

const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")

const cors = require("cors")

// const cookieParser = require("cookies-parser")


const routes = require("./routes")

const PORT = `${process.env.PORT}` || 5000

const app = express()

// app.use(cookie-parser())

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






