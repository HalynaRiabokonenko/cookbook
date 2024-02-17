import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import RecipesDataInterface from "./RecipeDetails.types";

function RecipeDetails() {

    const [recipesData, setRecipesData] = useState<RecipesDataInterface | null>(null);

    useEffect(() => {
        fetch("/recipes.json")
          .then((res) => res.json())
          .then((data) => setRecipesData(data));
      }, []);

      
  const { recipeId } = useParams();
  if (!recipeId) {
    return <div>No recipeId provided</div>;
  }
  
  const recipe = recipesData?.recipes.find(
    (recipe) => recipe.id === parseInt(recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return recipesData && (
    <main className={styles["recipe-details-content"]}>
      <section className={styles["recipe-details-content__container"]}>
        <h1 className={styles["recipe-details-content__header"]}>{recipe.name}</h1>
        <p className={styles["recipe-details-content__description"]}>
          {recipe.description}
        </p>
        <div className={styles["recipe-details-content__container-recipe-details"]}>
          <div className={styles["recipe-details-content__photo-container"]}>
            <img
              src={recipe.photoPath}
              alt={recipe.name}
              className={styles["recipe-details-content__photo"]}
            />
          </div>
          <div className={styles["recipe-details-content__ingredients-container"]}>
            <h3 className={styles["recipe-details-content__recipes-ingredients"]}>
              ingredients:
            </h3>
            <ul className={styles["recipe-details-content__ingredients-list"]}>
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className={styles["recipe-details-content__ingredients-list--option"]}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles["recipe-details-content__instructions-container"]}>
            <h3 className={styles["recipe-details-content__recipes-instructions"]}>
              instructions:
            </h3>
            <ol className={styles["recipe-details-content__instructions-list"]}>
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className={styles["recipe-details-content__instructions-list--option"]}
                >
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;
