import React, { ReactElement, useState, useEffect, useContext } from "react";
import RecipesDataInterface from "../../interface/recipesInterface.types";
import "./Home.css";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { ModeContext } from "../../providers/mode";

function Home() {
    const { mode } = useContext(ModeContext);
    const [recipesData, setRecipesData] = useState<RecipesDataInterface | null>(null);

    useEffect(() => {
        fetch("/recipes.json")
          .then((res) => res.json())
          .then((data) => 
          setRecipesData(data)
          );
      }, []);


  return recipesData && (
    <div className="home">
      <main className="home-content">
        <section className="home-content__container">
          <h1 className="home-content__header">Delicious Ukrainian Cuisine</h1>
          <p className="home-content__paragraph">
            Welcome to our website, where we have gathered a treasure trove of
            the most renowned recipes from Ukrainian cuisine. Here, you will
            embark on a culinary journey through the heart of Ukraine, exploring
            a diverse array of flavors and traditions that define this rich
            culinary heritage. From hearty borscht and savory pierogies to
            delectable and heavenly holubtsi, our page is a celebration of the
            country's most beloved dishes. Each recipe is carefully curated,
            offering you a chance to recreate the authentic taste of Ukrainian
            home-cooked meals in your own kitchen. Whether you are a seasoned
            chef or a beginner, our collection is designed to inspire and guide
            you through the preparation of these iconic dishes, allowing you to
            savor the essence of Ukrainian culture one bite at a time. Dive in
            and discover the magic of Ukrainian cuisine right here on our
            website.
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
                      <div className="home-content__recipes-info">
                        <p className="home-content__recipes-description">
                          {recipe.description}
                        </p>
                        <div className="home-content__recipes-content">
                          <div className="home-content__recipes-photo-container">
                            <img
                              src={recipe.photoPath}
                              alt={recipe.name}
                              className="home-content__recipes-photo"
                            ></img>
                          </div>
                          <div className="home-content__recipes-ingredients-container">
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
                          </div>
                          <div className="home-content__recipes-instructions-container">
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
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="home__all-recipes-container">
            <p className="home__all-recipes-paragraph">
              See all recipes{" "}
              <Link to="/recipes" className="home__all-recipes-link">
                here
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
