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
          Welcome to our website, where we have gathered a treasure trove of the
          most renowned recipes from Ukrainian cuisine. Here, you will embark on
          a culinary journey through the heart of Ukraine, exploring a diverse
          array of flavors and traditions that define this rich culinary
          heritage. From hearty borscht and savory pierogies to delectable and
          heavenly holubtsi, our page is a celebration of the country's most
          beloved dishes. Each recipe is carefully curated, offering you a
          chance to recreate the authentic taste of Ukrainian home-cooked meals
          in your own kitchen. Whether you are a seasoned chef or a beginner,
          our collection is designed to inspire and guide you through the
          preparation of these iconic dishes, allowing you to savor the essence
          of Ukrainian culture one bite at a time. Dive in and discover the
          magic of Ukrainian cuisine right here on our website.
        </p>
        <div className="container-home__list--popular">
          <div>
            <ul className="home__list--popular">
              {recipesData.recipes
                .filter((recipe) => [1, 3, 6].includes(recipe.id))
                .map((recipe) => (
                  <li
                    key={recipe.id}
                    className="home-content__recipes-list--option"
                  >
                    <h2 className="home-content__recipes-name">
                      {recipe.name}
                    </h2>
                    <img
                      src={recipe.photoPath}
                      alt={recipe.name}
                      className="home-content__recipes-photo"
                    ></img>
                    <h3 className="home-content__recipes-ingredients">
                      ingredients:
                    </h3>
                    <ul className="home-content__ingredients-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="home-content__ingredients-list--option"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                    <h3 className="home-content__recipes-instructions">
                      instructions:
                    </h3>
                    <ol className="home-content__instructions-list">
                      {recipe.instructions.map((instruction, index) => (
                        <li
                          key={index}
                          className="home-content__instructions-list--option"
                        >
                          {instruction}
                        </li>
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
