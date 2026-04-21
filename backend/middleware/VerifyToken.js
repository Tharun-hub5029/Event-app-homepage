const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require('fs');
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
   
    if (!token) return res.status(403).json({ message: "Access denied!" });

    try {
        const publicKey = fs.readFileSync('public.key',"utf-8");
        const decoded = jwt.verify(token.split(" ")[1],publicKey);
        req.user = decoded; 
       
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};
const clearUserSession = (req, res, next) => {
    req.user = null;
    next();
};


module.exports = {verifyToken,clearUserSession};
