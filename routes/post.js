const express = require("express");
const { authenticate } = require("../auth");
const Post = require("../schemas/PostSchema");
const UserSchema = require("../schemas/UserSchema");
const { default: mongoose } = require("mongoose");
const CommentSchema = require("../schemas/CommentSchema");

const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

router.use(authenticate);

router.post("/create", async (req, res) => {
    const currentUser = req.user;
    const userId = currentUser.userId;
    const postData = req.body;

    try {
        const newPost = new Post({
            title: postData.title,
            content: postData.content,
            imageUrls: postData.imageUrls,
            author: userId
        });

        await newPost.save();
        await UserSchema.findOneAndUpdate({ _id: userId },
            { $push: { posts: newPost } },
            { new: true }
        );

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/all", async (req, res) => {
    const user = req.user;
    const userId = req.query.userId || user.userId;

    try {
        const posts = await Post.aggregate([
            { $match: { author: new ObjectId(userId) } },
            {
                $project: {
                    title: 1,
                    content: 1,
                    imageUrls: 1,
                    likesCount: { $size: "$likes" },
                    commentsCount: { $size: "$comments" }
                }
            }
        ]);

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/like", async (req, resp) => {
    const postId = req.query.postId;
    const userId = req.user.userId;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        );

        if (!updatedPost) {
            return resp.status(404).json({ message: "Post not found" });
        }
        console.log(updatedPost);
        resp.status(201).json({ message: "Post liked successfully" });
    } catch (error) {
        console.error("Error liking post:", error);
        resp.status(500).json({ message: "Internal server error" });
    }
});

router.post("/comment", async (req, resp) => {
    const userId = req.user.userId;
    const postId = req.query.postId;
    const commentMessage = req.body.message;

    try {
        const newComment = new CommentSchema({
            message: commentMessage,
            user: userId
        });

        await newComment.save();
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        if (!updatedPost) {
            return resp.status(404).json({ message: "Post not found" });
        }

        resp.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        resp.status(500).json({ message: "Internal server error" });
    }
});

router.get("/comments", async (req, res) => {
    const postId = req.query.postId;

    try {
        // Find the post document based on the postId
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Extract the comments associated with the post
        const comments = await CommentSchema.find({ _id: { $in: post.comments } }, { _id: 0, __v: 0 })
            .populate('user', 'name -_id') // Populate the username field from the 'user' collection
            .select('message timeStamp user');

        res.status(200).json({ comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = { postsRouter: router }