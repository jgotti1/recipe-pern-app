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

// Route to serve the photo
router.get("/:id/photo", async (req, res) => {

 
  try {
    // console.log(req.params.id)
    const recipe = await database.query("SELECT photo_name FROM recipes WHERE id = $1", [req.params.id]);
    // const photoName = recipe.rows[0].photo_name;

    if (recipe.rows.length > 0) {
      const photoName = recipe.rows[0].photo_name;
      
      if (photoName !== undefined && photoName !== null && photoName !== '') {
        // If photo_name is not blank or null, send the photo_name
        res.json(photoName);
      } else {
        // If photo_name is blank or null, send "no photo image"
        res.json("no photo image");
      } 
    } else {
      // If no recipe found with the specified id, send an appropriate response
      res.status(404).json({ error: "Recipe not found" });
    }
   
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
    const recipe = await database.query("INSERT INTO recipes (recipe_name, recipe_type, recipe_directions) VALUES ($1, $2, $3) RETURNING *", [
      req.body.recipe_name,
      req.body.recipe_type,
      req.body.recipe_directions,
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
    const recipe = await database.query("UPDATE recipes SET recipe_name = $1, recipe_type= $2, recipe_directions = $3 WHERE id = $4 RETURNING *", [
      req.body.recipe_name,
      req.body.recipe_type,
      req.body.recipe_directions,
      req.params.id,
    ]);
    // console.log(req.body),
    res.json(recipe.rows[0]);
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
