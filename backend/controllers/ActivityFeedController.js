const User = require("../model/user");
const Post = require("../model/Post");
const Like = require("../model/Like");
const Comment = require("../model/Comment");
const {getIo} = require("../config/socket");

// ✅ Create a Post with Multiple Media Files
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const mediaUrls = req.files.map((file) => file.location); // Get S3 URLs for uploaded files
    console.log("CONTENT : "+content);
    console.log("MEDIA_URL : "+mediaUrls);
    console.log(req.user.id);
    const newPost = await Post.create({
      userId: req.user.id,
      content,
      media_url: mediaUrls,
    });
    const io = getIo();
    io.emit("newPost", newPost); 
    console.log("New Post CReated");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message:"File is Missing",error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ["id", "username", "profile_pic"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    console.log("Received Like Request - Post ID:", postId, "User ID:", userId);

    // Check if post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ where: { userId, postId } });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    // Create like and update count
    await Like.create({ userId, postId });
    post.likes += 1;
    await post.save();

    const io = getIo();
    if (io) {
      io.emit("likePost", { postId: post.id, likes: post.likes });
      console.log("✅ Like Event Emitted - Post ID:", postId, "Total Likes:", post.likes);
    } else {
      console.error("❌ WebSocket IO is null");
    }

    res.json({ message: "Liked", postId, likes: post.likes });
  } catch (error) {
    console.error("❌ Error in LikePost:", error.message);
    res.status(500).json({ message: "Failed to like post", error: error.message });
  }
};



exports.commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    console.log("text : "+text);
    console.log("postId : "+postId);
    const newComment = await Comment.create({ userId: req.user.id, postId, text });
    const commentWithUser = await Comment.findOne({
      where: { id: newComment.id },
      include: [{ model: User, attributes: ["username"] }], // Include username
    });

    const io = getIo();
    io.emit("commentPost", { postId, comment: commentWithUser });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async(req,res)=>{
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({
            where: { postId },
            include: [{ model: User, attributes: ["username"] }],
            order: [["createdAt", "ASC"]],
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

