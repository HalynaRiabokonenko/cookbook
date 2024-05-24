import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderNavbar.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
interface HeaderNavbar {
    user: User | null;
}

export const HeaderNavbar = ({ user }: HeaderNavbar) => {
    const { mode } = useModeContext();
    const location = useLocation();

    return (
        <div className={styles["global-nav__container"]}>
            <nav className={styles["global-nav"]}>
                <ul className={styles["global-nav__list"]}>
                    <li>
                        <Link
                            className={classnames(
                                styles["global-nav__list-item-link"],
                                styles["global-nav__list-item-link--home"],
                                styles[mode])}
                            to="/"
                        >
                            <div className={classnames(
                                styles["global-nav__list-item"],
                                styles[mode],
                                { [styles.active]: location.pathname === '/' }
                            )}>Home</div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={classnames(
                                styles["global-nav__list-item-link"],
                                styles[mode]
                            )}
                            to="/recipes"
                        >
                            <div className={classnames(
                                styles["global-nav__list-item"],
                                styles[mode],
                                { [styles.active]: location.pathname === '/recipes' || location.pathname.includes('/recipes/') }

                            )}>Recipes</div>
                        </Link>
                    </li>
                    <li >
                        <Link
                            className={classnames(
                                styles["global-nav__list-item-link"],
                                styles["global-nav__list-item-link--about"],
                                styles[mode]
                            )}
                            to="/about"
                        >
                            <div className={classnames(
                                styles["global-nav__list-item"],
                                styles[mode],
                                { [styles.active]: location.pathname === '/about' }
                            )}>About us</div>
                        </Link>
                    </li>
                    {!user && <li>
                        <Link
                            className={classnames(
                                styles["global-nav__list-item-link"],
                                styles[mode]
                            )}
                            to="/login"
                        >
                            <div className={classnames(
                                styles["global-nav__list-item"],
                                styles[mode],
                                { [styles.active]: location.pathname === '/login' || location.pathname === '/sign-up' }
                            )}>Login</div>
                        </Link>
                    </li>}
                </ul>
            </nav>
        </div>
    );
}
