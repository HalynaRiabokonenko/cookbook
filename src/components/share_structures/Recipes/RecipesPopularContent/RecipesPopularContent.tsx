import React from "react";
import { RecipesContent } from "../RecipesContent/RecipesContent";
import styles from "./RecipesPopularContent.module.css"

const recipes: Array<string> = ["american", "georgian", "german", "indian", "italian", "japanese", "polish", "spanish", "ukrainian"];

export const RecipesPopularContent = () => {
    return (
        <div className={styles["recipes__container"]}>
            {recipes.map((recipe) => {
                return <div key={recipe}><RecipesContent option={recipe} /></div>;
            })}
        </div>
    );
};
