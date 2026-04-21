const  User  = require('../model/user');
const { hashPassword, verifyUniversityEmail, generateTokens,comparePassword} = require('../Utils/authHelper')
const multer = require("multer");

const profileUpload = multer({ storage: multer.memoryStorage() }); // In-memory upload

exports.signup = async (req, res) => {
    try {
        profileUpload.single("profile_pic")(req, res, async (err) => {
            if (err) return res.status(400).json({ message: "File upload failed", error: err.message });

            const { username, university_email, role, personal_email, full_name, contact_number, skills, interests, password } = req.body;

          
            const isValidUniversityEmail = await verifyUniversityEmail(university_email);
            if (!isValidUniversityEmail) {
                return res.status(400).json({ message: "Invalid university email. Use an official university email." });
            }

         
            const existingUser = await User.findOne({
                where: { university_email },
            });

            if (existingUser) {
                return res.status(400).json({ message: "Email already registered" });
            }

           
            const hashedPassword = await hashPassword(password);

         
            const profileUrl = req.file ? req.file.location : null;

       
            const user = await User.create({
                username, university_email, personal_email, full_name, contact_number, skills, interests, role,
                password: hashedPassword, profile_pic: profileUrl,
            });

            const tokens = generateTokens(user);

            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true, secure: true, sameSite: "Strict",
            });

            res.status(201).json({
                message: "User registered successfully",
                user: { id: user.id, username: user.username, role: user.role },
                accessToken: tokens.accessToken,
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        
        const tokens = generateTokens(user);

       
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true, secure: true, sameSite: "Strict",
        });
       
        res.json({
            message: "Login successful",
            user,
            accessToken: tokens.accessToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Login error", error: error.message });
    }
};
