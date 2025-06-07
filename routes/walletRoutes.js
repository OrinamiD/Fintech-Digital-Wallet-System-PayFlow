

const express = require("express")
const { validateMoneyTransfer, auth, validateFundingWallet } = require("../middleware")
const { handleMoneyTransfer, handleFundWallet, handleGetUserWallet, handleGetAllTransactions, handleUserTransactions } = require("../controllers/walletController")

const router = express.Router()

// Transfer funds betwen users
router.post("/money-transfer", validateMoneyTransfer, auth, handleMoneyTransfer)

// funding users account
router.post("/fund-wallet",  validateFundingWallet, auth, handleFundWallet)

// Check out for user wallet
router.get("/wallet", auth,  handleGetUserWallet)

// check all transactions
router.get("/all-users-transactions",  auth, handleGetAllTransactions)

 //  check one user transactions
router.get("/user-transaction", auth, handleUserTransactions) 



module.exports = router

