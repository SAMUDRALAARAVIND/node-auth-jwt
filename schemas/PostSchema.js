const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrls: [String],
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        validate: {
            validator: function (array) {
                return new Set(array).size === array.length;
            },
            message: () => "Can't like a post again"
        }
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
