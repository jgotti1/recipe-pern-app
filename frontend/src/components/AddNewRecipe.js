import { useState } from "react";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import axios from "axios";

const AddNewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeType, setRecipeType] = useState("Recipe Type");
  const { addRecipe } = useContext(RecipeContext);

  // Create new Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recipeName != "" && recipeType != "Recipe Type") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}recipes`, {
          recipe_name: recipeName,
          recipe_type: recipeType,
        });

        if (response.status === 200) {
          // below code to refresh the screen by running the useEffect in the list with this logic below //
          addRecipe(response.data);

          //reset create form
          setRecipeName("");
          setRecipeType("Recipe Type");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Invalid Recipe Name or Type Please try again");
    }
  };

  return (
    <div>
      <h5 className="text-center  text-info mt-4">Create New Recipe</h5>
      <div className="createBox">
        <form className="justify-content-center row formBox">
          <div className="col-5">
            <label className="visually-hidden" htmlFor="autoSizingInput"></label>
            <input type="text" className="form-control" id="autoSizingInput" placeholder="Recipe Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          </div>
          <div className="col-4">
            <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)} className="form-select" id="autoSizingSelect">
              <option disabled>Recipe Type</option>
              <option value="Meal">Meal</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
              <option value="Snack">Snack</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" onClick={handleSubmit} className="btn btn-secondary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewRecipe;
