const SavedPost = require("../model/SavedPost");

exports.Save =  async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const savedPost = await SavedPost.create({ userId, postId });
        res.json(savedPost);
    } catch (error) {
        return res.status(500).json({ message: "Error saving post", error: error.message });
    }
};

exports.getSavedPosts =  async (req, res) => {
    console.log("Decoded user ID:", req.user.id);
    console.log("Requested user ID:", req.params.userId);

    // if (req.user.id !== parseInt(req.params.userId)) {
    //     return res.status(403).json({ message: "You are not authorized to view these saved posts." });
    // }
    console.log("Requested user ID:", req.params.userId);
    try {
        const savedposts = await SavedPost.findAll({ where: { userId: req.params.userId } });
        res.json(savedposts);
        console.log("Requested user ID:", req.params.userId);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching saved posts", error: error.message });
    }
};

exports.removeSavedPost = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        await SavedPost.destroy({ where: { userId, postId } });
        res.json({ message: "Post removed from saved posts" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


