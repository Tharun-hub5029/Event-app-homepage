const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Update with your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔗 User connected:", socket.id);

    socket.on("join-room", (userId) => {
        socket.join(`user-${userId}`);
        console.log(`User ${socket.id} joined room user-${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

const getIo = () => {
  if (!io) {
    console.log("❌ WebSocket IO is not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIo };
