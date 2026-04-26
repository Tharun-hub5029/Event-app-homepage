const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");

const privateKey = fs.readFileSync("private.key", "utf-8");
const publicKey = fs.readFileSync("public.key", "utf-8");


const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


const generateTokens = (user) => {
    const payload = { id: user.id, role: user.role, username: user.username };

    const accessToken = jwt.sign(payload, privateKey, {
        expiresIn: "1d",
        algorithm: "RS256",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
        expiresIn: "7d",
        algorithm: "RS256",
    });

    return { accessToken, refreshToken };
};


const verifyUniversityEmail = async (email) => {
    try {
        const apiKey = process.env.ABSTRACT_API_KEY;
        const response = await axios.get(
            `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
        );

        const data = response.data;
        return (
            data.is_valid_format?.value &&
            !data.is_disposable_email?.value &&
            !data.is_free_email?.value
        );
    } catch (error) {
        console.error("Email verification failed:", error.message);
        return false;
    }
};

module.exports = { hashPassword, comparePassword, generateTokens, verifyUniversityEmail, publicKey };
