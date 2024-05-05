const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    timeStamp: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("comment", CommentSchema);