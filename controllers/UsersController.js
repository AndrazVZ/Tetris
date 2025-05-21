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
    try {
          // 1. Multer puts the file metadata on req.file
          if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
          }
      
          // 2. Build a URL that your React <img> can fetch
          const pictureUrl = `/uploads/${req.file.filename}`;
      
          // 3. Update the user’s profilePicture field in Mongo
          const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { profilePicture: pictureUrl },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
          }
      
          // 4. Send the updated user back to the client
          res.json(updatedUser);
        } catch (err) {
          console.error("Error in updateProfilePicture:", err);
          res.status(500).json({ error: "Failed to update profile picture" });
        }
      };
        
    const checkScoreAndUpdate = async(req,res) =>{
      try{
        const userId = req.body.id;
        const newScore = req.body.score;
        const user = await User.findById({_id:userId});

        if(!user){
          return res.status(404).json({error:"User not found."});
        }

        if(user.score < newScore){
          const updatedUser = await User.findByIdAndUpdate(userId,{score:newScore});

          if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
          }

          res.json(updatedUser);
        }else{
          return res.status(200).json({ message: "Score not updated. Existing score is higher." });
        }
      }catch(err){
        res.status(500).json({ error: "Failed to update score" });
      }
    };

module.exports = {
    getAllUsers,
    createUser,
    updateProfilePicture,
    checkScoreAndUpdate
  };
  
