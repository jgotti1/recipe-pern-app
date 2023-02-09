import React, { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";

import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const { recipeFilter, setRecipeFilter } = useContext(RecipeContext);
  const { recipeFilteredData, setRecipeFilteredData } = useContext(RecipeContext);
  const { ingredients } = useContext(RecipeContext);
  const [filter, setFilter] = useState("Filter Recipes");
  const navigate = useNavigate();

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
  }, [recipes.length, recipeFilteredData, recipeFilter, setRecipes, ingredients]);

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

  //Edit Recipe
  const handleDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/recipe/${id}/update`);
  };

  return (
    <div className="list-group container-sm mt-4 recipeList">
      <form className="justify-content-center row">
        <div className="col-7 filterMe">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select shadowBox" id="autoSizingSelect">
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
          <button onClick={handleFilter} className="btn btn-light btn-outline-primary shadowBox">
            Set Filter
          </button>
        </div>
      </form>
      <br />
      <table className="table table-sm table-hover shadowBox">
        <thead>
          <tr className="bg-primary text-white">
            <th className="col-5 ps-3" scope="col">
              Recipe
            </th>
            <th className="col-5" scope="col">
              Type
            </th>
            <th className="col-1" scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="tableBody  table-light">
          {recipes &&
            recipes.map((recipe) => {
              return (
                <tr
                  key={recipe.id}
                  onClick={(e) => {
                    handleDetails(e, recipe.id);
                  }}>
                  <td className="col-6 ps-3">{recipe.recipe_name}</td>
                  <td className="col-5 ps-1"> {recipe.recipe_type}</td>
                  <td className="col-1">
                    <button
                      onClick={(e) => {
                        if (window.confirm("Are you sure you want to delete this recipe?")) {
                          handleDelete(e, recipe.id);
                        } else {
                          window.location.reload();
                        }
                      }}
                      className="btn btn-sm btn-danger">
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
