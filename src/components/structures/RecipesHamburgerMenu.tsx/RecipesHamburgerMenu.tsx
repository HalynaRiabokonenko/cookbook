import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownMenuIcon } from '@radix-ui/react-icons';
import { useModeContext } from '../../../providers/mode';

interface RecipesHamburgerMenu {
    onSelectOption: (option: string) => void;
}

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

export const RecipesHamburgerMenu = ({ onSelectOption }: RecipesHamburgerMenu) => {
    const { mode } = useModeContext();
    const isDarkMode = mode === 'dark';

    return (
        <div className="flex justify-end w-full px-8 py-4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        className={`rounded-full w-[34px] h-[34px] inline-flex items-center justify-center ${isDarkMode ? 'text-white bg-black' : 'text-mediumGreenDark border-mediumGreenDark bg-white'} border outline-none`}
                        aria-label="Header options"
                    >
                        <DropdownMenuIcon />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className={`w-screen h-screen ${isDarkMode ? 'bg-black text-headerTextDark' : 'bg-white text-headerText'} shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]`}
                        sideOffset={5}
                    >
                        <ul>
                            {recipes.map((recipe) => (
                                <li key={Math.floor(Math.random() * Date.now())} onClick={() => onSelectOption(recipe.option)}>
                                    <DropdownMenu.Item className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                                        {recipe.name}
                                    </DropdownMenu.Item>
                                </li>
                            ))}
                        </ul>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};
