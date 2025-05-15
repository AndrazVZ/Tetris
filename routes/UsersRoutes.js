// routes/UsersRoutes.js
const express = require("express");
const path    = require("path");
const multer  = require("multer");
const router  = express.Router();
const UsersController = require("../controllers/UsersController");

// store uploads in root/uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => 
      cb(null, path.join(__dirname, "../uploads")),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname))
  });
  
  const upload = multer({ storage });

router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.createUser);

router.put(
    "/update-profile-picture/:userId",
    upload.single("profilePicture"),
    UsersController.updateProfilePicture
  );

module.exports = router;
