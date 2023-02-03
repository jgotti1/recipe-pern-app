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

//Get all recipes
router.get("/", async (req, res) => {
  try {
    const results = await database.query("SELECT * FROM recipes ORDER By recipe_name");
    res.json(results.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get all recipes filtered by type
router.get("/filter/:recipeFilter", async (req, res) => {
  try {
    const recipes = await database.query("select * from recipes WHERE recipe_type = $1 ORDER BY recipe_name", [req.params.recipeFilter]);

    res.json(recipes.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get a single Recipe with ingredients by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await database.query("SELECT * FROM recipes WHERE id = $1", [req.params.id]);
    const ingredients = await database.query("SELECT * FROM ingredients WHERE recipe_id = $1 ORDER BY ingredient", [req.params.id]);
    res.json({
      recipe: recipe.rows[0],
      ingredients: ingredients.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// *************************** Create ***************************** //

//Create single Recipe
router.post("/", async (req, res) => {
  try {
    const recipe = await database.query("INSERT INTO recipes (recipe_name, recipe_type, recipe_directions, recipe_notes) VALUES ($1, $2, $3, $4) RETURNING *", [
      req.body.recipe_name,
      req.body.recipe_type,
      req.body.recipe_directions,
      req.body.recipe_notes,
    ]);
    res.json(recipe.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//*******************************Update ************************* */

//Update a single recipe by ID

router.put("/:id", async (req, res) => {
  try {
    const recipe = await database.query("UPDATE recipes SET recipe_name = $1, recipe_type= $2, recipe_directions = $3, recipe_notes = $4  WHERE id = $5 RETURNING *", [
      req.body.recipe_name,
      req.body.recipe_type,
      req.body.recipe_directions,
      req.body.recipe_notes,
      req.params.id,
    ]);
    console.log(req.body), res.json(recipe.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// *********************************DELETE Recipe and all ingredients attached to the same ID******************************

router.delete("/:id", async (req, res) => {
  try {
    const ingredients = await database.query("DELETE FROM ingredients WHERE recipe_id = $1 RETURNING *", [req.params.id]);
    const recipe = await database.query("DELETE FROM recipes WHERE id = $1 RETURNING *", [req.params.id]);
    res.json({
      recipe: recipe.rows[0],
      ingredients: ingredients.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
