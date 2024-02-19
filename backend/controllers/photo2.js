const express = require("express");
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../db/dataBase.js");
const path = require("path");

dotenv.config();


router.use(cors());


router.put("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const { photo2URL } = req.body; // Assuming the photo URL is sent in the request body

  try {
   await database.query("UPDATE recipes SET photo_name_2 = $1 WHERE id = $2", [photo2URL, recipeId]);
    res.status(200).send("Photo URL updated successfully");
  } catch (error) {
    console.error("Error updating photo URL:", error);
    res.status(500).send("Error updating photo URL");
  }
});


module.exports = router;