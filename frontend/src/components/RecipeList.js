import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";
// import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);

  // Get all Recipes at refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipes`);

        setRecipes(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [recipes, setRecipes]);

  // Delete a recipe

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}recipes/${id}`);
      if (response.ok) {
        setRecipes(
          recipes.filter((recipe) => {
            return recipe.id !== id;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    // setRestaurants(
    //   restaurants.filter((restaurant) => {
    //     return restaurant.id !== id;
    //   })
    // );
  };

  return (
    <div className="list-group container-xlg mt-4">
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
