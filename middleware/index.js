const joi = require("joi");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const jwt = require("jsonwebtoken");
const { validEmail } = require("../sendEmails/registrationEmail");

const validateRegistration = async (req, res, next) => {
  const { name, email, password, walletBalance } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Enter your name");
  }

  if (!email) {
    errors.push("Enter your email");
  }

  if (!validEmail(email)) {
    errors.push("Invalid Email");
  }

  if (!password) {
    errors.push("Enter your password");
  }

  if (password.length < 8) {
    errors.push("password require minimum of 8 characters");
  }

  if (errors.length > 0) {
    return res.status(401).json({ message: errors });
  }

  const signupSchema = joi.object({
    name: joi.string().required(),

    email: joi
      .string()
      .required()
      .min(4)
      .max(60)
      .pattern(new RegExp("^[^@]+@[^@]+.[^@]+$"))
      .messages({
        "string.pattern.base":
          "Please enter a valid email address (e.g., name@example.com).",
        "string.email": "Please enter a valid email address.",
      }),

    password: joi
      .string()

      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      )
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }),
  });

  const { error } = signupSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Enter your email");
  }

  if (!password) {
    errors.push("Enter your password");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }
  next();
};

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ Message: "Access denied" });
    }

    const splitToken = token.split(" ");

    const realToken = splitToken[1];

    const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);

    if (!decoded) {
      return res.status(401).json({ Message: " Please login" });
    }

    const user = await User.find(decoded?.id);

    if (!user) {
      return res.status(404).json({ message: "Incorrect details" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const validateFogotPaasword = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Enter your email");
  }

  if (!password) {
    errors.push("Enter your password");
  }

  next();
};

const validateResetPassword = async (req, res, next) => {
  const { password } = req.body;

  const errors = [];

  if (!password) {
    errors.push("Please provide your password");
  }

  if (errors.length > 0) {
    return res.status(500).json({ message: errors });
  }
  next();
};

const validateFundingWallet = async (req, res, next) => {
  const { email, amount } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Please provide your email");
  }

  if (!amount) {
    errors.push("Please provide the amount");
  }

  if (amount < 100) {
    errors.push("Amount must be greater than 99 naira");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};
const validateMoneyTransfer = async (req, res, next) => {
  const { _id, email, sender, receiver, balance, amount } = req.body;

  const errors = [];

  if (!email) {
    errors.push("please, provide your email");
  }

  if (!sender) {
    errors.push("please, provide sender email");
  }

  if (!receiver) {
    errors.push("please, provide receiver's email");
  }

  if (!amount) {
    errors.push("please, provide your amount");
  }

  if (Number(amount) <= 99) {
    errors.push("minimum amount to send is 100 naira");
  }

  if (Number(amount) > balance) {
    errors.push("Insufficient balance");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  auth,
  validateFogotPaasword,
  validateResetPassword,
  validateFundingWallet,
  validateMoneyTransfer,
};
