import React from "react";
import { Link } from "react-router-dom";
import recipesData from "../recipes.json";
import "../styles/Recipes.css";

function RecipesContent() {
  return (
    <main className="recipes-content">
      <section className="recipes-content__container">
        <h1 className="recipes-content__header">Most popular recipes</h1>
        <p className="recipes-content__paragraph">
          “A recipe has no soul. You, as the cook, must bring soul to the
          recipe.” – Thomas Keller
        </p>
        <div className="recipes_all_list">
          <div className="recipes-content__recipes-list">
            {recipesData.recipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <div className="recipes-content__recipes-list--option">
                  <img
                    src={recipe.photoPath}
                    alt={recipe.name}
                    className="recipes-content__recipes-photo"
                  ></img>
                  <h2 className="recipes-content__recipes-name">
                    {recipe.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipesContent;
