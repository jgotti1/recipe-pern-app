
const express = require("express");
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../db/dataBase.js");
const multer = require("multer"); // Add multer for handling file uploads
const path = require("path"); // Import path module

dotenv.config();


// Set up multer storage to define where to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", "images")); // Save files to public/images directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  },
});

const upload = multer({ storage: storage });


// Function to update recipe with photo name
exports.updateRecipePhotoName = async (recipeId, photoName) => {
  try {
    // Update recipe in the database with the photo name
    // const recipe = database.query("UPDATE recipes SET photo_name = $1 WHERE id = $2", [photoName, recipeId])
  
  } catch (error) {
    console.error("Error updating photo name:", error);
    throw new Error("Error updating photo name");
  }
};

const uploadPhotoMiddleware = upload.single("photo");

module.exports = uploadPhotoMiddleware;

