import React, { useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { ModeContext } from "../../../../providers/mode";
import styles from "./RecipesNavigation.module.css";
import classnames from "classnames";

interface Recipe {
    name: string;
    slug: string;
}

interface RecipesNavigationProps {
    onSelectOption: (option: string) => void;
}

const recipes: Recipe[] = [
    { name: "American", slug: "american" },
    { name: "Georgian", slug: "georgian" },
    { name: "German", slug: "german" },
    { name: "Indian", slug: "indian" },
    { name: "Italian", slug: "italian" },
    { name: "Japanese", slug: "japanese" },
    { name: "Polish", slug: "polish" },
    { name: "Spanish", slug: "spanish" },
    { name: "Ukrainian", slug: "ukrainian" },
];

export const RecipesNavigation: React.FC<RecipesNavigationProps> = ({ onSelectOption }) => {
    const { mode } = useContext(ModeContext);

    const handleOptionSelect = useCallback((option: string) => {
        onSelectOption(option);
    }, [onSelectOption]);

    return (
        <aside className={styles["recipes__aside"]}>
            <ul className={classnames(
                styles["recipes__aside-list"],
                styles[mode]
            )} >
                {recipes.map((recipe) => (
                    <li
                        key={recipe.slug}
                        className={`${styles["recipes__aside-list-option"]} ${styles[mode]}`}
                        onClick={() => handleOptionSelect(recipe.slug)}
                    >
                        <NavLink
                            className={`${styles["recipes__aside-list-option-link"]} ${styles[mode]} ${window.location.pathname.includes(`/recipes/${recipe.slug}`) && styles.active}`}
                            to={`/recipes/${recipe.slug}`}
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
