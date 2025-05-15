const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());        // Parse JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //Profile Picture


// Connect to MongoDB
const { MONGO_USER, MONGO_PASS } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@tetris.2vcsrft.mongodb.net/Tetris?retryWrites=true&w=majority&appName=Tetris`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

// Import Routes
const UsersRoutes = require("./routes/UsersRoutes");
const authRoutes = require("./routes/auth");

// Use Routes
app.use("/api/users", UsersRoutes);
app.use("/api/auth", authRoutes);

// Serve React frontend static files (only for production)
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
