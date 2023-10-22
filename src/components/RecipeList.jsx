import React from "react";
import recipesData from "../recipes.json";
import "../styles/Recipes.css";

const RecipeList = () => {
  return (
    <div>
      <ul className="recipes-content__recipes-list">
        {recipesData.recipes.map((recipe) => (
          <li key={recipe.id} className="recipes-content__recipes-list--option">
            <h2 className="recipes-content__recipes-name">{recipe.name}</h2>
            <img
              src={recipe.photoPath}
              alt={recipe.name}
              className="recipes-content__recipes-photo"
            ></img>
            <h3 className="recipes-content__recipes-ingredients">
              ingredients:
            </h3>
            <ul className="recipes-content__ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="recipes-content__ingredients-list--option"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <h3 className="recipes-content__recipes-instructions">
              instructions:
            </h3>
            <ol className="recipes-content__instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="recipes-content__instructions-list--option"
                >
                  {instruction}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
