import React from "react";
import recipesData from "../recipes.json";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function HomeContent() {
  return (
    <main className="home-content">
      <section className="home-content__container">
        <h1 className="home-content__header">Delicious Ukrainian Cuisine</h1>
        <p>
          “A recipe has no soul. You, as the cook, must bring soul to the
          recipe.” – Thomas Keller
        </p>
        <div className="container-recipes__list--popular">
          <div>
            <ul className="recipes__list--popular">
              {recipesData.recipes
                .filter((recipe) => [1, 3, 6].includes(recipe.id))
                .map((recipe) => (
                  <li key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <h3>ingredients:</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h3>instructions:</h3>
                    <ol>
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </li>
                ))}
            </ul>
            <p>
              See all recipes here:
              <Link to="/recipes">Recipes</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomeContent;
