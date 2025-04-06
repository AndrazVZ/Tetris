const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController"); // Import the controller

// Route to get all users
router.get("/", UsersController.getAllUsers);

// Route to create a new user
router.post("/", UsersController.createUser);

module.exports = router;
