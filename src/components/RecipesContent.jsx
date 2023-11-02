import React from "react";
import RecipeList from "./RecipeList";
import "../styles/Recipes.css";
import recipesData from "../recipes.json";
import { Link } from "react-router-dom";

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
          <div>
            <div className="recipes-content__recipes-list">
              {recipesData.recipes.map((recipe) => (
                <Link to="/">
                  <div
                    key={recipe.id}
                    className="recipes-content__recipes-list--option"
                  >
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
          </div>{" "}
        </div>
      </section>
    </main>
  );
}

export default RecipesContent;
