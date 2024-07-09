import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useModeContext } from "../../../../providers/mode";
import styles from "./RecipeOption.module.css";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Recipe } from "../../../../commons/types/Recipe";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { Avatar, Box, IconButton, Text } from "@radix-ui/themes";
import { DocumentData, collection, onSnapshot, doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { Cuisine } from "../../../../commons/types/Cuisine";
import { db } from "../../../../api/firebaseConfig";
import { ModalAlertLogin } from "../../ModalAlertLogin/ModalAlertLogin";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { User } from "firebase/auth";
import { toast } from 'react-toastify';
import { Toast } from "../../../atomic/Toast/Toast";

interface RecipeOptionTypes {
    recipe: Recipe;
    user: User | null;
    isAddedToFavorite: boolean;
}

export const RecipeOption: React.FC<RecipeOptionTypes> = ({ recipe, user, isAddedToFavorite }) => {
    const { mode } = useModeContext();
    const [cuisinesData, setCuisinesData] = useState<Cuisine[]>([]);

    const toggleFavorite = async () => {
        if (user && recipe.id && recipe) {
            const userId = user.uid;
            const cuisine = recipe.cuisine;

            try {
                const docRef = doc(db, `userFavorites/${userId}/cuisines/${cuisine}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.recipes && data.recipes.includes(recipe.id)) {
                        await updateDoc(docRef, {
                            recipes: arrayRemove(recipe.id)
                        });
                        toast.success("Removed from favorites");
                    } else {
                        await updateDoc(docRef, {
                            recipes: arrayUnion(recipe.id)
                        });
                        toast.success("Added to favorites");
                    }
                } else {
                    await setDoc(docRef, {
                        recipes: [recipe.id]
                    });
                    toast.success("Added to favorites");
                }
            } catch (error) {
                console.error("Error changing favorites status:", error);
                toast.error("Error changing favorites status");
            }
        } else if (!user) {
            console.error("User is not logged in");
            toast.error("You need to log in to change favorites status");
        } else {
            console.error("Something went wrong");
            toast.error("Something went wrong");
        }
    };

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

    const cuisineSrc = (cuisineOption: string) => {
        const cuisine = cuisinesData.find(el => el.id === cuisineOption);
        return cuisine ? cuisine.img : '';
    };

    return (
        <div className="relative">
            <Link to={`/recipes/${recipe.cuisine}/${recipe.id}`} className={classnames(
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
                    <div className="flex justify-center items-center h-[10%] relative">
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className={`relative capitalize flex flex-row items-center justify-center h-full hover:underline`}>
                                    {recipe.name}
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className={`max-w-[400px] p-4 shadow-lg rounded-lg ${mode === 'dark' ? 'bg-midnightMoss' : 'bg-white'}`}>
                                <div className="flex items-start space-x-4 h-full">
                                    <div className="h-full w-full flex flex-col items-start ml-3">
                                        <Avatar
                                            size="3"
                                            fallback="R"
                                            radius="full"
                                            src={cuisineSrc(recipe.cuisine)}
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
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <ModalAlertLogin user={user}>
                            <IconButton
                                onClick={toggleFavorite}
                                className={`absolute bottom-2 right-2 p-2 bg-transparent rounded-md 
                                            ${mode === "dark" ?
                                        "hover:bg-optionHoverDark" :
                                        "hover:bg-optionHover"
                                    }`
                                }
                            >
                                {isAddedToFavorite ?
                                    <HeartFilledIcon width="14" height="14" />
                                    :
                                    <HeartIcon width="14" height="14" />
                                }
                            </IconButton>
                        </ModalAlertLogin>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-white rounded-md p-2">
                        {isAddedToFavorite ? "Remove from favorites" : "Add to favorites"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Toast />
        </div>
    );
};
