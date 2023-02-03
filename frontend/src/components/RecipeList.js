import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";

// import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { recipeFilter, setRecipeFilter } = useContext(RecipeContext);
  const { recipeFilteredData, setRecipeFilteredData } = useContext(RecipeContext);
  const [filter, setFilter] = useState("Filter Recipes");

  // Get all Recipes at refresh
  useEffect(() => {
    if (recipeFilter !== "Filter Recipes" && recipeFilter !== "*All Recipes*") {
      setRecipes(recipeFilteredData);
    } else {
      const fetchData = async () => {
        try {
          const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipes`);
          setRecipes(data.data);
          console.log("UseEffect Ran");
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [recipes.length, recipeFilteredData, recipeFilter, setRecipes]);

  // filter by type
  const handleFilter = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipes/filter/${filter}`);

      setRecipeFilteredData(data.data);
    } catch (error) {
      console.log(error);
    }

    setRecipeFilter(filter);
  };

  // Delete a recipe

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}recipes/${id}`);
      if (response.status === 200) {
        setRecipes(
          recipes.filter((recipe) => {
            return recipe.id !== id;
          })
        );
        if (recipeFilter !== "Filter Recipes" && recipeFilter !== "*All Recipes*") {
          handleFilter(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-group container-xlg mt-4">
      <form className="justify-content-center row ">
        <div className="col-7 filterMe">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select" id="autoSizingSelect">
            <option disabled value="Filter Recipes">
              Filter Recipes
            </option>
            <option value="Meal">Meal</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
            <option value="Snack">Snack</option>
            <option value="Other">Other</option>
            <option value="*All Recipes*">*All Recipes*</option>
          </select>
        </div>
        <div className="col-auto">
          <button onClick={handleFilter} className="btn btn-light btn-outline-primary">
            Set Filter
          </button>
        </div>
      </form>

      <br />
      <table className="table table-hover ">
        <thead>
          <tr className="bg-primary text-white">
            <th scope="col">Recipe</th>
            <th scope="col">Type</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {recipes &&
            recipes.map((recipe) => {
              return (
                <tr key={recipe.id}>
                  <td>{recipe.recipe_name}</td>
                  <td>{recipe.recipe_type}</td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        if (window.confirm("Are you sure you want to delete this recipe?")) handleDelete(e, recipe.id);
                      }}
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;
