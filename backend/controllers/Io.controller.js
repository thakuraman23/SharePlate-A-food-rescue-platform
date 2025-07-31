const { Server } = require("socket.io");

let io;

const setupWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://rescuefoodfrontend.vercel.app", "http://localhost:3000"], 
      methods: ["GET", "POST"],
      credentials: true,  // 🔹 Allow credentials
    },
    transports: ["websocket", "polling"],  // 🔹 Ensure it supports multiple transports
  });

  io.on("connection", (socket) => {
    console.log("🔗 New client connected:", socket.id);

    socket.on("registerVolunteer", (email) => {
      socket.join(email.email); 
      console.log(`📌 Volunteer joined room: ${email.email}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};


const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

// ✅ Correct way to export both functions
module.exports = { setupWebSocket, getIoInstance };
