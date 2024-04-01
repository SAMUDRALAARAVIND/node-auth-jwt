const express = require("express");
const { authenticate } = require("../auth");
const UserSchema = require("../schemas/UserSchema");

const router = express.Router();

router.use(authenticate);

router.get("/suggestions", async (req, resp) => {
    const userId = req.user.userId;
    try {
        const user = await UserSchema.findById(userId, { following: 1, _id: 0 })
        const suggestions = await UserSchema.find({ _id: { $nin: user.following } }, { name: 1, email: 1, gender: 1, city: 1 })

        const response = suggestions.map(suggestion => ({ ...suggestion.toObject(), following: false }));

        resp.status(200).json({ suggestions: response })
    }
    catch (error) {
        console.log(error);
        resp.status(500).json({ message: error.message ?? "unable to load suggestions" });
    }
})

router.post("/follow", async (req, res) => {
    const currentUserId = req.user.userId;
    const targetUserId = req.body.userId;

    try {
        const [currentUserEntity, targetUserEntity] = await Promise.all([
            UserSchema.findById(currentUserId),
            UserSchema.findById(targetUserId)
        ]);

        if (!currentUserEntity || !targetUserEntity) {
            return res.status(404).json({ message: "User not found" });
        }

        currentUserEntity.following.push(targetUserEntity._id);
        await currentUserEntity.save();

        targetUserEntity.followers.push(currentUserEntity._id);
        await targetUserEntity.save();

        res.status(200).json({
            message: "Successfully followed user", user: {
                email: targetUserEntity.email,
                gender: targetUserEntity.gender,
                name: targetUserEntity.name,
                city: targetUserEntity.name,
                followers: targetUserEntity.followers.length,
                following: targetUserEntity.following.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/unfollow", async (req, res) => {
    const currentUserId = req.user.userId;
    const targetUserId = req.body.userId;

    try {
        await UserSchema.findOneAndUpdate({ _id: currentUserId }, { $pull: { following: targetUserId } }, { new: true });
        await UserSchema.findOneAndUpdate({ _id: targetUserId }, { $pull: { followers: currentUserId } }, { new: true });

        res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to unfollow retry again" });
    }
});

router.get("/followers", async (req, res) => {
    const userId = req.query?.userId || req.user.userId;
    try {
        const user = await UserSchema.findById(userId).populate('followers following', 'name gender city email');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Iterate over followers and add following property
        const followersWithFollowing = user.followers.map(follower => {
            const isFollowing = user.following.some(followedUser => followedUser._id.equals(follower._id));
            return { ...follower.toObject(), following: isFollowing };
        });

        res.json(followersWithFollowing);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/following", async (req, res) => {
    const userId = req.query?.userId || req.user.userId;
    try {
        const user = await UserSchema.findById(userId).populate('following', 'name gender email city');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const response = user.following.map(following => ({ ...following.toObject(), following: true }))
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/info", async (req, res) => {
    const userId = req.query.userId || req.user.userId;

    try {
        const user = await UserSchema.findById(userId).populate('followers').populate('following').populate('posts');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const followersCount = user.followers.length;
        const followingCount = user.following.length;
        const postsCount = user.posts.length;
        const userDetails = { name: user.name, email: user.email, city: user.city, gender: user.gender, bio: user.bio };
        res.json({
            followers: followersCount,
            following: followingCount,
            posts: postsCount,
            ...userDetails
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = { userRouter: router };