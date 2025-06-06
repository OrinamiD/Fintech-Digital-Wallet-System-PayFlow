

const express = require("express")
const { handleWelcomeMessage, handleUserRegistration, handleUserLogin, handleForgotPassword, handleResetPassword, handleLogOut } = require("../controllers/authController")
const { validateRegistration, validateLogin, validateFogotPaasword, validateResetPassword } = require("../middleware")

const router = express.Router()


// // welcome message
router.get("/", handleWelcomeMessage)

// User registration
router.post("/sign-up", validateRegistration, handleUserRegistration)

// Login
router.post("/login", validateLogin, handleUserLogin)

// fotgotten password
router.post("/forgot-password", validateFogotPaasword, handleForgotPassword)

 // Rest password
router.patch("/reset-password", validateResetPassword, handleResetPassword)

router.post("/logout", handleLogOut)







module.exports = router