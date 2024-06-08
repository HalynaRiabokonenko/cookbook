import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useModeContext } from "../../../../providers/mode";
import styles from "./RecipeOption.module.css";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Recipe } from "../../../../commons/types/Recipe";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Avatar, Box, Text } from "@radix-ui/themes";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { Cuisine } from "../../../../commons/types/Cuisine";
import { db } from "../../../../api/firebaseConfig";

interface RecipeOptionTypes {
    recipe: Recipe;
}

export const RecipeOption = ({ recipe }: RecipeOptionTypes) => {
    const { mode } = useModeContext();
    const [cuisinesData, setCuisinesData] = useState<Cuisine[]>([]);

    useEffect(() => {
        const unsubscribeCuisines = onSnapshot(collection(db, "cuisines"), (snapshot) => {
            const fetchedCuisines: Cuisine[] = snapshot.docs.map((doc: DocumentData) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    img: data.img || '',
                    description: data.description || '',
                };
            });
            setCuisinesData(fetchedCuisines);
        });

        return () => {
            unsubscribeCuisines();
        };
    }, []);

    let cuisineSrc = (cuisineOption: string) => {
        const cuisine = cuisinesData.find(el => el.id === cuisineOption);
        return cuisine ? cuisine.img : '';
    };

    return (
        <div className="recipe-option__container">
            <Link to={`/recipes/${recipe.option}/${recipe.id}`} className={classnames(
                styles["recipes-content__recipes-link"],
                styles[mode]
            )}>
                <div className={classnames(
                    styles["recipes-content__recipes-list--option"],
                    styles[mode]
                )}>
                    <div className="w-full overflow-hidden ">
                        <AspectRatio.Root ratio={5 / 3}>
                            <img
                                className="h-full w-full object-cover"
                                src={recipe.src}
                                alt={recipe.name}
                            />
                        </AspectRatio.Root>
                    </div>
                    <div className="flex justify-center items-center h-[10%] z-[999] relative">
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className={`relative capitalize flex flex-row items-center justify-center h-full`}>
                                    {recipe.name}
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className={`max-w-[300px] p-4 shadow-lg rounded-lg ${mode === 'dark' ? 'bg-midnightMoss' : 'bg-white'}`}>
                                <div className="flex items-start space-x-4 h-full">
                                    <div className="h-full w-full flex flex-col items-start ml-3">
                                        <Avatar
                                            size="3"
                                            fallback="R"
                                            radius="full"
                                            src={cuisineSrc(recipe.option)}
                                            alt={recipe.name}
                                        />
                                    </div>
                                    <Box className="flex flex-col items-start h-full">
                                        <Text as="div" size="1" className="font-light text-sm text-justify mr-3">
                                            {recipe.description}
                                        </Text>
                                    </Box>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </Link>
        </div>
    );
};
