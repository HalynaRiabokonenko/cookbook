import React from "react";
import recipesData from "../recipes.json";
import "../styles/Recipes.css";

const RecipeList = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul className="recipes-content__recipes-list">
        {recipesData.recipes.map((recipe) => (
          <li key={recipe.id} className="recipes-content__recipes-list--option">
            <h2 className="recipes-content__recipes-name">{recipe.name}</h2>
            <h3>ingredients:</h3>
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
            <h3>instructions:</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
