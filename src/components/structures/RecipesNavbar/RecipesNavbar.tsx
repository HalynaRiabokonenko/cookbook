import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useModeContext } from "../../../providers/mode";
import styles from "./RecipeNavbar.module.css";

const recipes = [
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

interface RecipesNavbarProps {
    onSelectOption: (option: string) => void;
}

const RecipesNavbar: React.FC<RecipesNavbarProps> = ({ onSelectOption }) => {
    const { mode } = useModeContext();
    const location = useLocation();

    return (
        <div className={`h-[50px] flex flex-row top-0 right-0 items-center justify-center w-full fixed z-[999] border-b-[0.5px] border-darkGreen mt-[70px] ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <div className="h-full flex-grow-4">
                <nav className="w-full h-full">
                    <ul className="list-none flex h-full space-x-2">
                        {recipes.map((recipe) => (
                            <li
                                key={recipe.option}
                                className="text-uppercase font-bold min-w-[90px] h-full flex justify-center items-center cursor-pointer"
                                onClick={() => onSelectOption(recipe.option)}
                            >
                                <Link
                                    className={`h-full ${mode === 'dark' ? 'text-headerTextDark' : 'text-darkGreen'} hover:${mode === 'dark' ? 'text-orangeDark' : 'text-mediumGreen'}`}
                                    to={`/recipes/${recipe.option}`}
                                >
                                    <div className={`relative flex flex-row items-center justify-center h-full ${location.pathname === `/recipes/${recipe.option}` ? `${styles.active} ${styles[mode]}` : ''}`}>
                                        {recipe.name}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default RecipesNavbar;
