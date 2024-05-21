import React, { useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useModeContext } from "../../../../providers/mode";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
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
    const { mode } = useModeContext();

    const handleOptionSelect = useCallback((option: string) => {
        onSelectOption(option);
    }, [onSelectOption]);

    return (
        <aside className="flex-shrink-0 w-72 mx-9">
            <NavigationMenu.Root className={classnames(
                "border rounded-lg p-1",
                {
                    "border-lightGreen bg-lighterGreen": mode === 'light',
                    "border-lightGreenDark bg-midnightMoss": mode === 'dark',
                }
            )}>
                <NavigationMenu.List className="list-none p-0 m-2">
                    {recipes.map((recipe) => (
                        <NavigationMenu.Item key={recipe.option} className="text-lg p-1">
                            <NavLink
                                className={({ isActive }) => classnames(
                                    "block no-underline transition-colors duration-300 p-4 rounded-lg",
                                    {
                                        "text-headerText": mode === 'light' && !isActive,
                                        "text-headerTextDark": mode === 'dark' && !isActive,
                                        "bg-gray-50 text-black": mode === 'light' && isActive,
                                        "bg-darkGray text-white": mode === 'dark' && isActive,
                                        "hover:bg-gray-50": mode === 'light' && !isActive,
                                        "hover:bg-darkGray": mode === 'dark' && !isActive,
                                    }
                                )}
                                to={`/recipes/${recipe.option}`}
                                onClick={() => handleOptionSelect(recipe.option)}
                            >
                                {recipe.name} Recipes
                            </NavLink>
                        </NavigationMenu.Item>
                    ))}
                </NavigationMenu.List>
            </NavigationMenu.Root>
        </aside>
    );
};