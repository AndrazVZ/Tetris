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

    const updateProfilePicture = async (req, res) => {
        const { profilePicture } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { profilePicture },
                { new: true }
            );
            res.json(updatedUser);
        } catch (error) {
            console.error("Error updating profile picture:", error);
            res.status(500).json({ error: "Failed to update profile picture" });
        }
    };

module.exports = {
    updateProfilePicture,
};

module.exports = {
    getAllUsers,
    createUser,
    updateProfilePicture,
};
