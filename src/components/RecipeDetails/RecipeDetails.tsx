import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import RecipesDataInterface from "./RecipeDetails.types";
import { ModeContext } from "../../providers/mode";
import classnames from "classnames";
import { db } from "../../api/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

function RecipeDetails() {
  const { mode } = useContext(ModeContext);
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!recipeId) {
        return;
      }

      const docRef = doc(db, "recipes", recipeId);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchData();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles["recipe-details-content"]}>
      <section className={classnames(
        styles["recipe-details-content__container"],
        styles[mode]
      )}>
        <h1 className={styles["recipe-details-content__header"]}>{recipe.name}</h1>
        <p className={styles["recipe-details-content__description"]}>
          {recipe.description}
        </p>
        <div className={classnames(
          styles["recipe-details-content__container-recipe-details"],
          styles[mode]
        )}>
          <div className={styles["recipe-details-content__photo-container"]}>
            <img
              src={recipe.photoPath}
              alt={recipe.name}
              className={styles["recipe-details-content__photo"]}
            />
          </div>
          <div className={styles["recipe-details-content__ingredients-container"]}>
            <h3 className={styles["recipe-details-content__recipes-ingredients"]}>
              Ingredients:
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
              Instructions:
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
