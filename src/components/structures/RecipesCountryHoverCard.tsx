import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useModeContext } from '../../providers/mode';

interface Cuisine {
    id: string;
    img: string;
    description: string;
}

interface RecipesListProps {
    cuisinesData: Cuisine[];
}


export const RecipesList = ({ cuisinesData }: RecipesListProps) => {
    const { mode } = useModeContext();
    const navigate = useNavigate();

    return (
        <div className="flex justify-center flex-wrap">
            <ul className="flex flex-row flex-wrap justify-center">
                {cuisinesData.map(cuisine => (
                    <HoverCard key={cuisine.id}>
                        <HoverCardTrigger asChild>
                            <li
                                className={classNames(
                                    'bg-green-100 dark:bg-gray-800 align-baseline border border-green-200 dark:border-green-800 rounded-lg m-5 p-5 w-2/5 cursor-pointer hover:bg-green-200 dark:hover:bg-gray-700',
                                    mode === 'dark' && 'dark'
                                )}
                                onClick={() => navigate(`/recipes/${cuisine.id}`)}
                            >
                                <div className="flex justify-center items-center">
                                    <img src={cuisine.img} className="h-20 m-4" alt={cuisine.description} />
                                </div>
                                <p className="text-lg font-light m-4 text-justify">{cuisine.description}</p>
                            </li>
                        </HoverCardTrigger>
                        <HoverCardContent className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                            <div className="flex flex-col items-center">
                                <img src={cuisine.img} className="h-40 w-40 object-cover rounded-full" alt={cuisine.description} />
                                <p className="text-lg font-semibold mt-4">{cuisine.description}</p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ))}
            </ul>
        </div>
    );
}