const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import models, controllers, and routes
const UsersRoutes = require("./routes/UsersRoutes"); // Routes


app.use(express.json()); // Middleware to parse JSON data

// Connect to MongoDB
const { MONGO_USER, MONGO_PASS } = process.env;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@tetris.2vcsrft.mongodb.net/Tetris?retryWrites=true&w=majority&appName=Tetris`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.on("error", (err) => {
  console.error(" MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log(" Successfully connected to MongoDB");
});

// Use Routes
app.use("/", UsersRoutes); // Use users routes under the '/api/users' path

// Serve React static files
app.use(express.static(path.join(__dirname, "client", "build")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
