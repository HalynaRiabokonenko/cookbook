import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useModeContext } from "../../../../providers/mode";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import styles from "./RecipeOption.module.css";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface RecipeOptionTypes {
    recipe: RecipeInterface;
}

export const RecipeOption = ({ recipe }: RecipeOptionTypes) => {
    const { mode } = useModeContext();

    return (
        <div className="recipe-option__container">
            <Link to={`/recipes/${recipe.option}/${recipe.id}`} key={recipe.id} className={classnames(
                styles["recipes-content__recipes-link"],
                styles[mode]
            )}>
                <div className={classnames(
                    styles["recipes-content__recipes-list--option"],
                    styles[mode]
                )}>
                    <div className="w-full h-[60%] overflow-hidden ">
                        <AspectRatio.Root ratio={5 / 3}>
                            <img
                                className="h-full w-full object-cover"
                                src={recipe.src}
                                alt={recipe.name}
                            />
                        </AspectRatio.Root>
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
