import AddIngredient from "./AddIngredient";
import AddPhoto from "./AddPhoto";
import { useEffect, useState } from "react";

import axios from "axios";

const Ingredients = ({ ingredientProps, id }) => {
  const [hideIngredient, setHideIngredient] = useState();
  console.log(hideIngredient);

  const ingredients = ingredientProps;

  useEffect(() => {
    setHideIngredient(false);
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}recipes/ingredient/${id}`);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHideShow = () => {
    if (hideIngredient === false) {
      setHideIngredient(true);
    } else {
      setHideIngredient(false);
    }
  };

  return (
    <div>
      <div className="recipe_add">
        <AddIngredient ingredientProps={ingredientProps} id={id} />
      <AddPhoto id={id} />
      </div>
      <div className="hideShow">
        <button
          className="btn btn-primary btn-sm hideShowBtn"
          type="button"
          onClick={() => {
            handleHideShow();
          }}>
          Click Here Hide/Show Ingredients
        </button>
      </div>
      {!hideIngredient && 
      <table className="table table-sm table-hover container-sm ingredientWidth shadowBox ">
        
          <thead>
            <tr className="bg-primary text-white">
              <th className="col ps-3" scope="col">
                Ingredients
              </th>
              <th className="col-1 pe-4" scope="col">
                Delete
              </th>
            </tr>
          </thead>

        {!hideIngredient &&
          ingredients &&
          ingredients.map((ingredient) => {
            return (
              <tbody key={ingredient.id} className="tableBody  table-light">
                <tr>
                  <td className="col ps-3">{ingredient.ingredient}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger align-items-right"
                      onClick={(e) => {
                        if (window.confirm(`Are you sure you want to delete this ingredient ${ingredient.ingredient}?`)) {
                          handleDelete(e, ingredient.id);
                        } else {
                          window.location.reload();
                        }
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
  }
    </div>
  );
};

export default Ingredients;
