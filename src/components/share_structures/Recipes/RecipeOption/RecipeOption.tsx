import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ModeContext } from "../../../../providers/mode";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import styles from "./RecipeOption.module.css"

interface RecipeOptionTypes {
    option: string;
    recipe: RecipeInterface;
}

export const RecipeOption = ({ option, recipe }: RecipeOptionTypes) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className="recipe-option__container">
            <Link to={`/recipes/${option}/${recipe.id}`} key={recipe.id} className={classnames(
                styles["recipes-content__recipes-link"],
                styles[mode]
            )}>
                <div className={classnames(
                    styles["recipes-content__recipes-list--option"],
                    styles[mode]
                )}>
                    <div className={styles["recipes-content__recipes-photo-container"]}>
                        <img
                            src={recipe.src}
                            alt={recipe.name}
                            className={styles["recipes-content__recipes-photo"]}
                        />
                    </div>
                    <div className={styles["recipes-content__recipes-container"]}>
                        <h2 className={styles["recipes-content__recipes-name"]}>
                            {recipe.name}
                        </h2>
                    </div>
                </div>
            </Link>
        </div>

    );
};
