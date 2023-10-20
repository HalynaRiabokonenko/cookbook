import React from "react";
import RecipeList from "./RecipeList";
import "../styles/Main.css";

function Main() {
  return (
    <main>
      <section className="main">
        <h1>Most popular recipes</h1>
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

export default Main;
