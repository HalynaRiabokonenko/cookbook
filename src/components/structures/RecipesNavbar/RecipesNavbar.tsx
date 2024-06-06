import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModeContext } from "../../../providers/mode";
import styles from "./RecipeNavbar.module.css";
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { Avatar, Box, Text } from "@radix-ui/themes";
import { Cuisine } from "../../../commons/types/Cuisine";

interface RecipesNavbarProps {
    onSelectOption: (option: string) => void;
}

const RecipesNavbar: React.FC<RecipesNavbarProps> = ({ onSelectOption }) => {
    const { mode } = useModeContext();
    const location = useLocation();
    const [cuisinesData, setCuisinesData] = useState<Cuisine[]>([]);

    useEffect(() => {
        const unsubscribeCuisines = onSnapshot(collection(db, "cuisines"), (snapshot: { docs: DocumentData[] }) => {
            const fetchedCuisines: Cuisine[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCuisinesData(fetchedCuisines);
        });

        return () => {
            unsubscribeCuisines();
        };
    }, []);

    return (
        <div className={`h-[50px] flex flex-row top-0 right-0 items-center justify-center w-full fixed z-[4] border-b-[0.5px] border-darkGreen mt-[70px] ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <div className="h-full flex-grow-4">
                <nav className="w-full h-full">
                    <ul className="list-none flex h-full space-x-2">
                        {cuisinesData.map((cuisine) => (
                            <li
                                key={cuisine.id}
                                className="text-uppercase font-bold min-w-[90px] h-full flex justify-center items-center cursor-pointer"
                                onClick={() => onSelectOption(cuisine.id)}
                            >
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Link
                                            className={`h-full ${mode === 'dark' ? 'text-headerTextDark' : 'text-darkGreen'} hover:${mode === 'dark' ? 'text-orangeDark' : 'text-mediumGreen'}`}
                                            to={`/recipes/${cuisine.id}`}
                                        >
                                            <div className={`relative capitalize flex flex-row items-center justify-center h-full ${location.pathname === `/recipes/${cuisine.id}` ? `${styles.active} ${styles[mode]}` : ''}`}>
                                                {cuisine.id}
                                            </div>
                                        </Link>
                                    </HoverCardTrigger>
                                    <HoverCardContent className={`max-w-[300px] p-4 shadow-lg rounded-lg ${mode === 'dark' ? 'bg-midnightMoss' : 'bg-white'}`}>
                                        <div className="flex items-start space-x-4 h-full">
                                            <div className="h-full w-full flex flex-col items-start ml-3">
                                                <Avatar
                                                    size="3"
                                                    fallback="R"
                                                    radius="full"
                                                    src={cuisine.img}
                                                    alt={cuisine.id}
                                                />
                                            </div>
                                            <Box className="flex flex-col items-start h-full">
                                                <Text as="div" size="1" className="font-light text-sm text-justify mr-3">
                                                    {cuisine.description}
                                                </Text>
                                            </Box>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default RecipesNavbar;
