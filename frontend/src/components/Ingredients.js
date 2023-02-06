import React from "react";

const Ingredients = ({ ingredients }) => {
  return (
    <div>
      <div className="addIngred mb-2 mt-3">
        <h5>Click here to add ingredients</h5>
        <div>
          <button className="btn btn-sm btn-outline-primary">Add</button>
        </div>
      </div>
      <table className="table table-sm table-hover container-sm ingredientWidth">
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
          {ingredients &&
            ingredients.map((ingredient) => {
              return (
                <tbody key={ingredient.id}  className="tableBody">
                  <tr>
                    <td className="col ps-3">{ingredient.ingredient}</td>
                    <td>
                      <button className="btn btn-sm btn-danger">Delete</button>
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
