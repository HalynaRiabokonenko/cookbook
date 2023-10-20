import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import RecipeList from "./RecipeList";
import "../styles/App.css";

function Recipes() {
  return (
    <div className="recipes">
      <Header />
      <div className="recipes_all_list">
        <RecipeList />
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
