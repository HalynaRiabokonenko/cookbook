import React from "react";
import recipesData from "../recipes.json";
import "../styles/App.css";

const RecipeList = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipesData.recipes.map((recipe) => (
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
    </div>
  );
};

export default RecipeList;
