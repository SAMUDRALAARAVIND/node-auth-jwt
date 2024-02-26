const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: (name) => name.length >= 3
    },
    email: {
        type: String,
        required: true,
        validate: (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: (pass) => pass.length >= 3
    },
    gender: {
        type: String,
        required: true,
        validate: (gender) => gender === "MALE" || gender === "FEMALE" || gender === "OTHER"
    },
    city: {
        type: String,
        required: true,
    }
});

module.exports = model("user", UserSchema);