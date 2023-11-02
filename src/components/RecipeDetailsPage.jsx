import React from "react";
import Header from "./Header";
import RecipeDetailsContent from "./RecipeDetailsContent";
import Footer from "./Footer";
import "../styles/Recipes.css";

function Recipes() {
  return (
    <div className="recipes">
      <Header />
      <RecipeDetailsContent />
      <Footer />
    </div>
  );
}

export default Recipes;
