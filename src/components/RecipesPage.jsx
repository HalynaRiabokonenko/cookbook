import React from "react";
import Header from "./Header";
import RecipesContent from "./RecipesContent";
import Footer from "./Footer";

function Recipes() {
  return (
    <div className="recipes">
      <Header />
      <RecipesContent />
      <Footer />
    </div>
  );
}

export default Recipes;
