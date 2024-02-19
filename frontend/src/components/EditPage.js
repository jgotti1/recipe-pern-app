import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Ingredients from "./Ingredients";
import ImageModal from "./ImageModol";

const EditPage = () => {
  const [recipeDetails, setRecipeDetails] = useState("");
  const [recipeDetailsType, setRecipeDetailsType] = useState("");
  const [recipeDetailsName, setRecipeDetailsName] = useState("");
  const [recipeDetailsDirections, setRecipeDetailsDirections] = useState("");
  const [ingredientsDetails, setIngredientsDetails] = useState("");
  const [photoBlank, setPhotoBlank] = useState(false);
  const [photoBlank2, setPhotoBlank2] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photoName1, setPhotoName1] = useState()
  const [photoName2, setPhotoName2] = useState()

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
      setPhotoName1(response.data.recipe.photo_name);
      setPhotoName2(response.data.recipe.photo_name_2);
      setPhotoBlank(!!response.data.recipe.photo_name); 
      setPhotoBlank2(!!response.data.recipe.photo_name_2); 

    };
    updateRecipe();
  }, [id, ingredientsDetails.length, photoName1, photoName2, showModal]);
 



const handleDisplayPhoto = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}recipes/${id}`);
    const photoName = response.data.recipe.photo_name; // Assuming the response contains the photo name
    const photoName2 = response.data.recipe.photo_name_2; // Assuming the response contains the photo name 2    
    
    if (photoName && !photoName.includes("null")) {
      const photoUrl = photoName;
      setPhotoUrl(photoUrl);
    }
    if (photoName2 && !photoName2.includes("null")) {
      const photoUrl2 = photoName2;
      setPhotoUrl2(photoUrl2);
    }
  
    
   
    setShowModal(true);
  } catch (error) {
    console.error("Error fetching photo:", error);
  }
};


  
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

  return (
    <div>
      <h1 className="font-weight-bold display-1 text-center mt-1 fw-bolder display-1 textShadow mt-4">Recipe Details</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-sm btn-light btn-outline my-2 shadowBox"
          onClick={() => {
            navigate("/");
          }}>
          Back to Recipe List
        </button>
      </div>
      <div className="recipeType">
        <h3 className="text-primary text-center fs-2 fw-bolder recipeName">{recipeDetailsName}</h3>
        <select value={recipeDetailsType} onChange={(e) => setRecipeDetailsType(e.target.value)} className="form-select recipeTypeDrop shadowBox" id="autoSizingSelect">
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
            <div>
            <label className="textShadow m-1 directions-a">Recipe Directions:</label>
            </div>
            <ImageModal showModal={showModal} setShowModal={setShowModal} photoUrl={photoUrl} photoUrl2={photoUrl2} />
        {photoBlank || photoBlank2 ? (
          <label className="textShadow m-1 directions-b">This Recipe Contains a Photo: <a className="photoText" onClick={handleDisplayPhoto}>Please Click Here to View it</a></label>
        ) : null}
            <textarea value={recipeDetailsDirections} onChange={(e) => setRecipeDetailsDirections(e.target.value)} className="form-control shadowBox" rows="8"></textarea>
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
            className="btn btn-secondary my-auto shadowBox mt-3 text-white btn-outline-primary">
            <u>Save Changes</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
