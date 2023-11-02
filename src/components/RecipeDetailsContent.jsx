import React from "react";
import { useParams } from "react-router-dom";
import recipesData from "../recipes.json";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { recipeId } = useParams();
  const recipe = recipesData.recipes.find(
    (recipe) => recipe.id === parseInt(recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <main className="recipe-details-content">
      <section className="recipe-details-content__container">
        <h1 className="recipe-details-content__name">{recipe.name}</h1>
        <p className="recipe-details-content__description">
          {recipe.description}
        </p>
        <img
          src={recipe.photoPath}
          alt={recipe.name}
          className="recipe-details-content__photo"
        />

        <ul className="recipe-details-content__ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="recipe-details-content__ingredients-list--option"
            >
              {ingredient}
            </li>
          ))}
        </ul>
        <h3 className="recipe-details-content__recipes-instructions">
          instructions:
        </h3>
        <ol className="recipe-details-content__instructions-list">
          {recipe.instructions.map((instruction, index) => (
            <li
              key={index}
              className="recipe-details-content__instructions-list--option"
            >
              {instruction}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default RecipeDetails;
