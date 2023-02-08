import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Ingredients from "./Ingredients";

const EditPage = () => {
  const [recipeDetails, setRecipeDetails] = useState("");
  const [recipeDetailsType, setRecipeDetailsType] = useState("");
  const [recipeDetailsName, setRecipeDetailsName] = useState("");
  const [recipeDetailsDirections, setRecipeDetailsDirections] = useState("Enter Reciepe Directions Here");
  const [ingredientsDetails, setIngredientsDetails] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const updateRecipe = async (res, req) => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipes/${id}`);

      setRecipeDetails(response.data.recipe);
      setRecipeDetailsType(response.data.recipe.recipe_type);
      setRecipeDetailsName(response.data.recipe.recipe_name);
      setRecipeDetailsDirections(response.data.recipe.recipe_directions);
      setIngredientsDetails(response.data.ingredients);
    };
    updateRecipe();
  }, [id, ingredientsDetails.length]);

  const handleChanges = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}recipes/${id}`, {
        recipe_name: recipeDetailsName,
        recipe_type: recipeDetailsType,
        recipe_directions: recipeDetailsDirections,
      });
    } catch (error) {
      console.log(error);
    }
    alert("Recipe Changes Applied");
  };
  // console.log(recipeDetails, ingredientsDetails.length);
  return (
    <div>
      <h1 className="font-weight-bold display-1 text-center mt-1">Recipe Details</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-sm btn-outline-secondary my-2 shadow"
          onClick={() => {
            navigate("/");
          }}>
          Back to Recipe List
        </button>
      </div>
      <div className="recipeType">
        <h3 className="text-info text-center fs-2 fw-bolder recipeName">{recipeDetailsName}</h3>
        <select value={recipeDetailsType} onChange={(e) => setRecipeDetailsType(e.target.value)} className="form-select recipeTypeDrop" id="autoSizingSelect">
          <option disabled>Type</option>
          <option value="Meal">Meal</option>
          <option value="Dessert">Dessert</option>
          <option value="Drink">Drink</option>
          <option value="Snack">Snack</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Ingredients ingredientProps={ingredientsDetails} id={id} />
      <div className="form-group">
        <form>
          <div className="form-group container-flex directions mx-auto">
            <label>Recipe Directions</label>
            <textarea value={recipeDetailsDirections} onChange={(e) => setRecipeDetailsDirections(e.target.value)} className="form-control" rows="8"></textarea>
          </div>
        </form>

        <div className="d-flex justify-content-center">
          <button
            onClick={(e) => {
              if (window.confirm("Are you sure you want to update this recipe?")) {
                handleChanges(e, recipeDetails.id);
              } else {
                window.location.reload();
              }
            }}
            className="btn btn-secondary my-auto shadow mt-3 text-white btn-outline-primary">
            <u>Save Changes</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
