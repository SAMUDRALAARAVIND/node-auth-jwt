const express = require("express");
const UserSchema = require("../schemas/UserSchema");
const { generateTokenByUserId } = require("../auth");

const router = express.Router();

router.post("/signup", async (req, resp) => {
    const { name, email, gender, password, city } = req.body;
    if (!name || !email || !gender || !password || !city) {
        resp.status(400).json({ message: "Invalid payload" });
    }
    else {
        try {
            await UserSchema.create({ name, email, password, gender, city });
            resp.status(201).json({ message: "Signup success" });
        }
        catch (error) {
            if (error.code === 11000) {
                resp.status(400).json({ message: "User already exists" });
            }
            else resp.status(500).json({ message: error.message })
        }
    }
});

router.post("/login", async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400).json({ message: "Email and Password are required" });
    }
    else {
        const response = await UserSchema.findOne({ email, password });

        if (!response) {
            resp.status(400).json({ message: "Invalid credentials" });
        }
        else {
            const token = generateTokenByUserId(response._id);
            resp.status(200).json({ token });
        }
    }
});

module.exports = { authRouter: router };