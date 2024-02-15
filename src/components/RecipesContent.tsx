import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Recipes.css";
import RecipesDataInterface  from "../interface/recipesInterface.types";

function RecipesContent() {

 const [recipesData, setRecipesData] = useState<RecipesDataInterface | null>(null);
 
  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => setRecipesData(data));
  }, []);

  return recipesData && (
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
