const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Allow frontend connections (CORS enabled for development)
const io = new Server(server, {
  cors: {
    origin: "*", // in production set your frontend domain
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Listen for chat messages
  socket.on("chatMessage", (msg) => {
    console.log("Message received:", msg);

    // Send the message to all other users (not sender)
    socket.broadcast.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
