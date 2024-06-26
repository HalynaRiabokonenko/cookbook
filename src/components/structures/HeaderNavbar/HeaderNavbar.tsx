import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import { Button } from "@radix-ui/themes";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { Cuisine } from "../../../commons/types/Cuisine";
import styles from "./HeaderNavbar.module.css"

interface HeaderNavbarProps {
    user: User | null;
}

export const HeaderNavbar = ({ user }: HeaderNavbarProps) => {
    const { mode } = useModeContext();
    const location = useLocation();
    const navigate = useNavigate();
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
        <NavigationMenu.Root className="relative z-[3] flex justify-end">
            <NavigationMenu.List className="m-0 flex items-center justify-center list-none rounded-[6px] p-1">
                <NavigationMenu.Item className={location.pathname === '/recipes' || location.pathname.includes('/recipes/') ? styles.active : ''}>
                    <NavigationMenu.Trigger className="h-headerHeight group flex select-none items-center rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none" >
                        <Button
                            className={classnames("uppercase border-none bg-none cursor-pointer flex justify-center items-center rounded py-2.5 px-7 rounded-xl bg-inherit leading-6 font-semibold",
                                {
                                    "hover:bg-optionHoverDark":
                                        mode === 'dark',
                                    "hover:bg-optionHover":
                                        mode !== 'dark',
                                }
                            )}
                            onClick={() => {
                                navigate("/recipes");
                            }}
                        >
                            Recipes
                        </Button>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                        className={classnames("absolute z-[3] top-headerHeight left-0 w-full sm:w-auto rounded-md",
                            {
                                "bg-mediumGreenDark":
                                    mode === 'dark',
                                "bg-white shadow-xl":
                                    mode !== 'dark',
                            })
                        }
                    >
                        <ul className="m-0  px-9 list-none w-full my-4">
                            {cuisinesData.map((cuisine) => (
                                <li
                                    key={cuisine.id}
                                    className={classnames("capitalize text-lg rounded-md font-normal h-full w-full flex justify-center items-center cursor-pointer py-2 px-9",
                                        {
                                            "hover:bg-optionHoverDark":
                                                mode === 'dark',
                                            "hover:bg-optionHover":
                                                mode !== 'dark',
                                        }
                                    )}
                                    onClick={() => navigate(`/recipes/${cuisine.id}`)}
                                >
                                    {cuisine.id}
                                </li>
                            ))}
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                {user &&
                    <NavigationMenu.Item className={location.pathname === '/favorites' ? styles.active : ''}>
                        <NavigationMenu.Trigger className="h-headerHeight group flex select-none items-center rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none" >
                            <Button
                                className={classnames("uppercase border-none bg-none cursor-pointer flex justify-center items-center rounded py-2.5 px-7 rounded-xl bg-inherit leading-6 font-semibold",
                                    {
                                        "hover:bg-optionHoverDark":
                                            mode === 'dark',
                                        "hover:bg-optionHover":
                                            mode !== 'dark',
                                    }
                                )}
                                onClick={() => {
                                    navigate("/favorites");
                                }}
                            >
                                Favorites
                            </Button>
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                }

                {!user && (
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger>
                            <Button
                                className={classnames(
                                    "uppercase mx-4 rounded px-9 py-2 rounded-xl bg-inherit text-l font-semibold leading-6 shadow-sm border border-solid",
                                    {
                                        "text-mediumGreen border-mediumGreen hover:bg-mediumGreen hover:text-mediumGreenDark":
                                            mode === 'dark',
                                        "text-red-400 border-red-300 hover:bg-red-300 hover:text-white":
                                            mode !== 'dark',
                                    }
                                )}
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Login
                            </Button>
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                )}
            </NavigationMenu.List>

        </NavigationMenu.Root >
    );

};
