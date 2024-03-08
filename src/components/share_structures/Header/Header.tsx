import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";
import { User } from "firebase/auth";

interface Props {
    user: User | null;
}

function Header({ user }: Props) {
    const { mode, toggleMode } = useContext(ModeContext);
    const navigate = useNavigate()

    const handlerSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/login");
            })
            .catch(error => {
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <header className={styles["header"]}>
            <div className={classnames(
                styles["header__container"],
                styles[mode]
            )}>
                <div className={styles["logo"]}>
                    <Link className={styles["logo__link"]} to="/">
                        <div className={styles["logo__link__container"]}>
                            {mode === "light" ? (
                                <img src="/logo-grey.png" alt="Proven Recipes logo" className={classnames(
                                    styles["logo__img"],
                                    styles[mode]
                                )} />
                            ) : (
                                <img src="/logo-dark.png" alt="Proven Recipes logo" className={classnames(
                                    styles["logo__img"],
                                    styles[mode]
                                )} />
                            )}
                        </div>
                    </Link>
                </div>
                <div className={styles["global-nav__container"]}>
                    <nav className={styles["global-nav"]}>
                        <ul className={styles["global-nav__list"]}>
                            {user && <li className={classnames(
                                styles["global-nav__list-user"],
                                styles[mode]
                            )}>
                                Hello, <div className={classnames(
                                    styles["global-nav__list-user--detail"],
                                    styles[mode]
                                )}>{auth?.currentUser?.email}</div>
                            </li>}
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
                            <li className={styles["global-nav__list-item"]}>
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
                            </li>
                            {!user && <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>}
                            {user && <li onClick={handlerSignOut} className={styles["global-nav__list-item"]}>
                                <div
                                    onClick={handlerSignOut}
                                >
                                    <p className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"],
                                        styles[mode]
                                    )}>Sign out</p>
                                </div>

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
