const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserSchema = require("./schemas/UserSchema");
const { generateTokenByUserId, authenticate } = require("./auth");

const app = express();
mongoose.connect("mongodb+srv://4byteinteger-root:aravind123@4byteinteger-mongo.fjsr0e4.mongodb.net/accio-users?retryWrites=true&w=majority&appName=4byteinteger-mongo")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});

app.post("/signup", async (req, resp) => {
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

app.post("/login", async (req, resp) => {
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

app.get("/users", authenticate, async (req, resp) => {
    const usersList = await UserSchema.find({}, { name: 1, email: 1, city: 1, gender: 1, _id: 0 });
    resp.status(200).json({ result: usersList });
})


