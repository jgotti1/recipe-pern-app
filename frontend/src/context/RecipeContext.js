import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export const RecipeContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeFilter, setRecipeFilter] = useState("Filter Recipes");
  const [recipeFilteredData, setRecipeFilteredData] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const addIngredients = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <RecipeContext.Provider
      value={{
        setRecipeFilteredData,
        recipeFilteredData,
        setRecipeFilter,
        recipeFilter,
        recipes,
        setRecipes,
        addIngredients,
        selectedRecipe,
        setSelectedRecipe,
        addRecipe,
        setIngredients,
        ingredients,
      }}>
      {props.children}
    </RecipeContext.Provider>
  );
};
