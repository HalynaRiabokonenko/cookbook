import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./HeaderNavbar.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import { Button } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";

interface HeaderNavbarProps {
    user: User | null;
}

export const HeaderNavbar = ({ user }: HeaderNavbarProps) => {
    const { mode } = useModeContext();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles["global-nav__container"]}>
            <nav className={styles["global-nav"]}>
                <ul className={styles["global-nav__list"]}>
                    <li>
                        <Link
                            className={classnames(
                                styles["global-nav__list-item-link"],
                                styles[mode]
                            )}
                            to="/recipes"
                        >
                            <div
                                className={classnames(
                                    styles["global-nav__list-item"],
                                    styles[mode],
                                    {
                                        [styles.active]: location.pathname === '/recipes' || location.pathname.includes('/recipes/')
                                    }
                                )}
                            >
                                <div className={classnames(
                                    "uppercase rounded px-9 py-2.5 rounded-xl bg-inherit text-l font-semibold leading-6",
                                    {
                                        "hover:bg-optionHoverDark":
                                            mode === 'dark',
                                        "hover:bg-optionHover":
                                            mode !== 'dark',
                                    }
                                )}>
                                    Recipes
                                </div>
                            </div>
                        </Link>
                    </li>
                    {!user && (
                        <li className="flex items-center h-full">
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
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};
