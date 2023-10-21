import React from "react";
import RecipeList from "./RecipeList";
import "../styles/Recipes.css";

function RecipesContent() {
  return (
    <main className="recipes-content">
      <section className="recipes-content__container">
        <h1 className="recipes-content__header">Most popular recipes</h1>
        <p>
          “A recipe has no soul. You, as the cook, must bring soul to the
          recipe.” – Thomas Keller
        </p>
        <div className="recipes_all_list">
          <RecipeList />
        </div>
      </section>
    </main>
  );
}

export default RecipesContent;
