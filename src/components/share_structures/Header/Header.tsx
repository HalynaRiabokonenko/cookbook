import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";

function Header({ user }) {
    const { mode, toggleMode } = useContext(ModeContext);

    return (
        <header className={styles["header"]}>
            <div className={classnames(
                styles["header__container"],
                styles[mode]
            )}>
                <div className={styles["logo"]}>
                    <Link className={styles["logo__link"]} to="/">
                        <div className={styles["global-mode__container"]}>
                            {mode === "light" ? (
                                <img src="/logo-light.png" className={styles["logo__img"]} alt="Logo proven recipes" />
                            ) : (
                                <img src="/logo-dark.png" className={styles["logo__img"]} alt="Logo proven recipes" />
                            )}
                        </div>
                    </Link>
                </div>
                <div className={styles["global-nav__container"]}>
                    <nav className={styles["global-nav"]}>
                        <ul className={styles["global-nav__list"]}>
                            <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--home"],
                                        styles[mode]
                                    )}
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            {user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}
                                    to="/recipes"
                                >
                                    Recipes
                                </Link>
                            </li>}
                            {user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--about"],
                                        styles[mode]
                                    )}
                                    to="/about"
                                >
                                    About us
                                </Link>
                            </li>}
                            {user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}
                                    to="/contact"
                                >
                                    Contact us
                                </Link>
                            </li>}
                            {!user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}
                                    to="/login"
                                >
                                    Log in
                                </Link>
                            </li>}
                            {!user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}
                                    to="/sign-up"
                                >
                                    Sign up
                                </Link>
                            </li>}
                            {user && <li onClick={() => signOut(auth)} className={styles["global-nav__list-item"]}>
                                <p className={classnames(
                                    styles["global-nav__list-item-link"],
                                    styles["global-nav__list-item-link--contact"],
                                    styles[mode]
                                )}>Log out</p>
                            </li>}
                        </ul>
                    </nav>
                </div>
                <div className={styles["global-mode__container"]}>
                    {mode === "light" ? (
                        <button

                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/dark.png" className={styles["global-mode__icon"]} />
                        </button>
                    ) : (
                        <button
                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/light.png" className={styles["global-mode__icon"]} />
                        </button>
                    )}
                </div>
            </div>
        </header >
    );
}

export default Header;
