const User = require('../models/UsersModel.js');
const bcrypt = require('bcryptjs');

// Register user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Incoming register request:", req.body);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            score: 0,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            score: user.score,
            profilePicture: user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
