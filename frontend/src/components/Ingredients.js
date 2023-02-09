import AddIngredient from "./AddIngredient";

import axios from "axios";

const Ingredients = ({ ingredientProps, id }) => {
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

  // console.log(ingredientProps)
  return (
    <div>
      <AddIngredient ingredientProps={ingredientProps} id={id} />

      <table className="table table-sm table-hover container-sm ingredientWidth shadowBox">
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
        {ingredientProps &&
          ingredientProps.map((ingredient) => {
            return (
              <tbody key={ingredient.id} className="tableBody  table-light">
                <tr>
                  <td className="col ps-3">{ingredient.ingredient}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        if (window.confirm("Are you sure you want to delete this recipe?")) {
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
    </div>
  );
};

export default Ingredients;
