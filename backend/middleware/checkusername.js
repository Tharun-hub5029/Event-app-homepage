const express =require('express');
const router = express.Router();
const User = require('../model/user');
const { error } = require('console');


const checkUsername = async (req, res, next) => {
  try {
    const { username } = req.query;

  
    if (!username || username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

   
    const existingUser = await User.findOne({ where: { username } });

  
    req.usernameAvailability = existingUser ? false : true;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error checking username", error: error.message });
  }
};

module.exports = checkUsername;