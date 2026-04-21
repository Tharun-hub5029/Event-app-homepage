const User = require("../model/user");
const Connection = require("../model/Connection");
const Post = require("../model/Post");
const {Op} = require('sequelize');


exports.pendingRequests = async (req, res) => {
  try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid user ID" });

      const requests = await Connection.findAll({
          where: { receiverId: id, status: "pending" },
          include: { model: User, as: "sender", attributes: ["id", "full_name", "profile_pic"] },
      });

      if (!requests.length) return res.status(200).json({ message: "No pending requests" });

      res.status(200).json(requests);
  } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
exports.getUserConnection = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

    console.log(`Fetching connections for userId: ${userId}`);

    const connections = await Connection.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        status: "accepted",
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "full_name", "profile_pic"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "full_name", "profile_pic"],
        },
      ],
    
    });

    if (!connections.length) return res.status(200).json({ friends: [] });

    // Extract the correct friend details and include updatedAt from the connection
    const friends = connections.map((conn) => {
      const friend = conn.senderId === Number(userId) ? conn.receiver : conn.sender; // Get the other user
      return {
        id: friend.id,
        full_name: friend.full_name,
        profile_pic: friend.profile_pic,
        updatedAt: conn.updatedAt, // Include updatedAt from Connection
      };
    });

    console.log(`UserId ${userId} - Friends:`);

    res.status(200).json({ friends});
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.getUserActivity = async (req, res) => {
  try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

      const posts = await Post.findAll({
          where: { userId },
          order: [["createdAt", "DESC"]],
          attributes: ["id", "content", "createdAt","media_url"], // 🔥 Fetch only necessary fields
      });

      if (!posts.length) return res.status(200).json({ message: "No activity found" });

      res.status(200).json(posts);
  } catch (error) {
      console.error("Error fetching activity:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ GET User Profile (Private vs Public)
exports.getUserProfile = async (req, res) => {
  try {
      const { id } = req.params;
      const { viewerId } = req.query; // Viewer ID from frontend

      if (isNaN(id) || isNaN(viewerId)) return res.status(400).json({ message: "Invalid IDs" });

      const user = await User.findByPk(id, {
          attributes: ["id", "username", "full_name", "profile_pic", "skills", "interests", "role", "createdAt"],
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      // Check if viewer is connected
      const isConnected = await Connection.findOne({
          where: {
              [Op.or]: [
                  { senderId: id, receiverId: viewerId },
                  { senderId: viewerId, receiverId: id }
              ],
              status: "accepted",
          }
      });

      if (!isConnected) return res.status(403).json({ message: "Profile is private" });

      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ GET All Users (Excluding Self)
exports.getAllUsers = async (req, res) => {
  try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) return res.status(400).json({ message: "Invalid user ID" });

      const users = await User.findAll({
          where: { id: { [Op.ne]: userId } }, // 🔥 Exclude logged-in user
          attributes: ["id", "full_name", "profile_pic", "university_email"],
      });

      if (!users.length) return res.status(200).json({ message: "No users found" });

      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};