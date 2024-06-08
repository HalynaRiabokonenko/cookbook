import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useModeContext } from "../../../providers/mode";
import styles from "./RecipeNavbar.module.css";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { Cuisine } from "../../../commons/types/Cuisine";

interface RecipesNavbarProps {
    onSelectOption: (option: string) => void;
}

export const RecipesNavbar: React.FC<RecipesNavbarProps> = ({ onSelectOption }) => {
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
                                <Link
                                    className={`h-full`}
                                    to={`/recipes/${cuisine.id}`}
                                >
                                    <div
                                        className={`relative capitalize flex flex-row items-center justify-center h-full 
                                    ${location.pathname === `/recipes/${cuisine.id}` ? `${styles.active} ${styles[mode]}` : ''}`}>
                                        <p className={` rounded px-3 py-2 rounded-xl bg-inherit text-l font-semibold leading-6 
                                        ${mode === 'dark' ? 'text-headerTextDark' : 'text-darkGreen'} hover:${mode === 'dark' ? 'bg-optionHoverDark' : 'bg-optionHover'}`}>
                                            {cuisine.id}
                                        </p>

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