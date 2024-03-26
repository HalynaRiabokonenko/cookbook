import React, { useContext, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ModeContext } from "../../../../providers/mode";
import styles from "./RecipesNavigation.module.css";
import classnames from "classnames";

interface Recipe {
    name: string;
    option: string;
}

interface RecipesNavigationProps {
    onSelectOption: (option: string) => void;
}

const recipes: Recipe[] = [
    { name: "American", option: "american" },
    { name: "Georgian", option: "georgian" },
    { name: "German", option: "german" },
    { name: "Indian", option: "indian" },
    { name: "Italian", option: "italian" },
    { name: "Japanese", option: "japanese" },
    { name: "Polish", option: "polish" },
    { name: "Spanish", option: "spanish" },
    { name: "Ukrainian", option: "ukrainian" },
];

export const RecipesNavigation: React.FC<RecipesNavigationProps> = ({ onSelectOption }) => {
    const { mode } = useContext(ModeContext);

    const handleOptionSelect = useCallback((option: string) => {
        onSelectOption(option);
    }, [onSelectOption]);

    const { option } = useParams<{ option: string }>();

    return (
        <aside className={styles["recipes__aside"]}>
            <ul className={classnames(styles["recipes__aside-list"], styles[mode])}>
                {recipes.map((recipe) => (
                    <li
                        key={recipe.option}
                        className={classnames(
                            styles["recipes__aside-list-option"],
                            { [styles.active]: option === recipe.option },
                            styles[mode]
                        )}
                        onClick={() => handleOptionSelect(recipe.option)}
                    >
                        <NavLink
                            className={`${styles["recipes__aside-list-option-link"]} ${styles[mode]} ${window.location.pathname.includes(`/recipes/${recipe.option}`) && styles.active
                                }`}
                            to={`/recipes/${recipe.option}`}
                        >
                            {recipe.name} Recipes
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default RecipesNavigation;
