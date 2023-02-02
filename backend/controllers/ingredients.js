// const router = require("express").Router();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../db/dataBase.js");
const app = express();
app.use(cors());
dotenv.config();

// *************************** Gets ***************************** //

//Get a single Ingregient by ID

router.get("/:id", async (req, res) => {
  try {
    const result = await database.query("SELECT * FROM ingredients WHERE id = $1", [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// *************************** Create ***************************** //

//Create single Ingredient
router.post("/", async (req, res) => {
  try {
    const ingredient = await database.query("INSERT INTO ingredients (ingredient, recipe_id) VALUES ($1, $2) RETURNING *", [req.body.ingredient, req.body.recipe_id]);
    res.json(ingredient.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//**********************************Update ***********************

router.put("/:id", async (req, res) => {
  try {
    const ingredient = await database.query("UPDATE ingredients SET ingredient = $1 WHERE id = $2 RETURNING *", [req.body.ingredient, req.params.id]);
    res.json(ingredient.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// *********************************DELETE a single ingredient******************************

router.delete("/:id", async (req, res) => {
  try {
    const ingredient = await database.query("DELETE FROM ingredients WHERE id = $1 RETURNING *", [req.params.id]);
   
    res.json(ingredient.rows[0]);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
