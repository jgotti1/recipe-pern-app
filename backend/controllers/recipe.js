// const router = require("express").Router();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../db/dataBase.js");
const app = express();
app.use(cors());
dotenv.config();

//Get all recipes
router.get("/", async (req, res) => {
  try {
    const results = await database.query("SELECT * FROM recipes ORDER By recipe_name");
    res.json(results.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get a single Recipe with ingredients by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await database.query("SELECT * FROM recipes WHERE id = $1", [req.params.id]);
    const ingredients = await database.query("SELECT * FROM ingredients WHERE recipe_id = $1", [req.params.id]);
    res.json({
      recipe: recipe.rows[0],
      ingredients: ingredients.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

//Create single Recipe
router.post("/", async (req, res) => {
  try {
    const recipe = await database.query("INSERT INTO recipes (recipe_name, recipe_type, recipe_directions, recipe_notes) VALUES ($1, $2, $3, $4) RETURNING *", [
      req.body.recipe_name,
      req.body.recipe_type,
      req.body.recipe_directions,
      req.body.recipe_notes,
    ]);
    console.log(req.body), res.json(recipe.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Create single Ingredient
router.post("/ingredient", async (req, res) => {
  try {
    const ingredient = await database.query("INSERT INTO ingredients (ingredient, recipe_id) VALUES ($1, $2) RETURNING *", [req.body.ingredient, req.body.recipe_id]);
    console.log(req.body), res.json(ingredient.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
