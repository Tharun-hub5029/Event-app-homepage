require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const sequelize = require("./config/db");

const User = require("./model/user");
const Post = require("./model/Post");
const Like = require("./model/Like");
const Comment = require("./model/Comment");
const SavedPost = require("./model/SavedPost");
const Connection = require("./model/Connection");

const University = require("./routes/universitiesRoute");
const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes");
const savedPosts = require("./routes/savedPostRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const users = require("./routes/usersRoutes");

const { getIo, initSocket } = require("./config/socket");

const app = express();
const server = createServer(app);

app.use(express.json());

app.use(cors({
  origin: "https://event-app-homepage.vercel.app",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/universities", University);
app.use("/api/feed", feedRoutes);
app.use("/api/savedPosts", savedPosts);
app.use("/api/users", users);
app.use("/api/connections", connectionRoutes);

// WebSocket
initSocket(server);
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

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});
