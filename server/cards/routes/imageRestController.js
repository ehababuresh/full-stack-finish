const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../path/to/config"); // Update the path

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No image provided" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: "images", // Optional: specify a folder in Cloudinary
    });

  
    const imageUrl = result.secure_url;

    return res.status(201).send({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).send({ error: "Failed to upload image" });
  }
});

module.exports = router;
