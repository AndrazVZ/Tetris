const User = require("../models/UsersModel.js"); // Import the User model

// Controller method to get all users
    getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
    };

    // Controller method to create a new user 
    createUser = async (req, res) => {
    try {
        const newUser = new User({
        name: req.body.name,
        score: req.body.score,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message });
    }
    };

module.exports = {
  getAllUsers,
  createUser
};
