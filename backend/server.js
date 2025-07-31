
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {setupWebSocket} = require('./controllers/Io.controller');
const Volunteer=require("./models/Volunteer.model")
require("dotenv").config();

const app = express();

// CORS setup with multiple allowed origins
const corsOptions = {
  origin: ["http://localhost:3000","https://rescuefoodfrontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"], // Add x-access-token
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error on connecting mongodb");
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Include route files
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

require("./routes/volunteer.route")(app);
require("./routes/restaurant.route")(app);

const syncIndexes = async () => {
  try {
    await Volunteer.syncIndexes();
    console.log("✅ 2dsphere index created successfully!");
  } catch (error) {
    console.error("❌ Error creating index:", error);
  }
};

syncIndexes();




// Set up HTTP server and WebSocket
const server = http.createServer(app);
setupWebSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
