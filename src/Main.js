import React from "react";
import RecipeList from "./RecipeList";

function Main() {
  return (
    <main>
      <section className="recipes">
        <h1>Most popular recipes</h1>
        <p>
          “A recipe has no soul. You, as the cook, must bring soul to the
          recipe.” – Thomas Keller
        </p>
        <div className="Recipes">
          <RecipeList />
        </div>
      </section>
    </main>
  );
}

export default Main;
