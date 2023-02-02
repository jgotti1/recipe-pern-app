import React from "react";
import Header from "./Header";
import RecipeList from "./RecipeList";
import AddNewRecipe from "./AddNewRecipe";

const Home = () => {
  return (
    <div>
      <Header />
      <AddNewRecipe/>
      <RecipeList/>
    </div>
  );
};

export default Home;
