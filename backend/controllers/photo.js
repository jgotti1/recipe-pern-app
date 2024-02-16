const express = require("express");
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../db/dataBase.js");
const multer = require("multer");
const path = require("path");

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(cors());

router.put("/:recipeId", upload.single("photo"), async (req, res) => {
  const recipeId = req.params.recipeId;
  const photoName = req.file.originalname;

  try {
    await database.query("UPDATE recipes SET photo_name = $1 WHERE id = $2", [photoName, recipeId]);
    res.status(200).send("Photo name updated successfully");
  } catch (error) {
    console.error("Error updating photo name:", error);
    res.status(500).send("Error updating photo name");
  }
});

module.exports = router;
