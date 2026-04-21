require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const User = require("../Backend/model/user");
const Post = require("../Backend/model/Post");
const Like = require("../Backend/model/Like");
const Comment = require("../Backend/model/Comment");
const SavedPost = require("../Backend/model/SavedPost");
const Connection = require("../Backend/model/Connection");
const University = require("../Backend/routes/universitiesRoute");
const authRoutes = require("../Backend/routes/authRoutes");
const feedRoutes = require("../Backend/routes/feedRoutes");
const savedPosts = require("../Backend/routes/savedPostRoutes");
const connectionRoutes = require("../Backend/routes/connectionRoutes");
const users = require("./routes/usersRoutes");
const { getIo, initSocket } = require("../Backend/config/socket");
const { createServer } = require("http");

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/universities", University);
app.use("/api/feed", feedRoutes);
app.use("/api/savedPosts", savedPosts);
app.use("/api/users", users);
app.use("/api/connections", connectionRoutes);


// Initialize WebSocket server
initSocket(server);

// ✅ Now, safely get the `io` instance after initializing it
const io = getIo();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(`user-${userId}`);
  }

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});
if (process.env.NODE_ENV === "production") {
  console.log("🚀 Production mode activated!");
} else {
  console.log("⚙️ Development mode activated!");
}
// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true }); // Sync DB
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});
