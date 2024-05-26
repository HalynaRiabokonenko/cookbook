import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import { useModeContext } from "../../../providers/mode";
import classnames from "classnames";
import { db } from "../../../api/firebaseConfig";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import RecipeInterface from "./RecipeDetails.types";
import PageHeader from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

function RecipeDetails() {
  const { mode } = useModeContext();
  const [recipe, setRecipe] = useState<RecipeInterface | null>(null);

  const { recipeId, option } = useParams<{ recipeId: string; option: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!recipeId) {
        return;
      }

      const docRef = doc(db, `${option}-recipes`, recipeId);

      try {
        const docSnap: DocumentSnapshot = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data() as RecipeInterface);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchData();
  }, [recipeId, option]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Page>
      <PageHeader>
        {recipe.name}
      </PageHeader>
      <p className={styles["recipe-details-content__description"]}>
        {recipe.description}
      </p>
      <div className={classnames(
        styles["recipe-details-content__container-recipe-details"],
        styles[mode]
      )}>
        <div className={styles["recipe-details-content__photo-container"]}>
          <div className=" w-[70%] overflow-hidden rounded-md">
            <AspectRatio.Root ratio={5 / 4}>
              <img
                className="h-full w-full object-cover"
                src={recipe.src}
                alt={recipe.name}
              />
            </AspectRatio.Root>
          </div>
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
    </Page>

  );
}

export default RecipeDetails;
