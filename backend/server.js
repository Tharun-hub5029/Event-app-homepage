require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const { sequelize, connectDB } = require("./config/db");

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

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/universities", University);
app.use("/api/feed", feedRoutes);
app.use("/api/savedPosts", savedPosts);
app.use("/api/users", users);
app.use("/api/connections", connectionRoutes);

// Socket (safe init)
try {
  initSocket(server);
} catch (err) {
  console.error("❌ Socket init failed:", err);
}

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

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
}

startServer();
