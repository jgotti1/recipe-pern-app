import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";
// import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);

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
                    <button className="btn btn-danger">Edit</button>
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
