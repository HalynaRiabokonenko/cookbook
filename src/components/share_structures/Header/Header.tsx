import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const location = useLocation();

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
                                    styles[mode])} />
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
                                        { [styles.active]: location.pathname === '/' }
                                    )}>Home</div>
                                </Link>
                            </li>
                            {user && <li>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles[mode]
                                    )}
                                    to="/recipes"
                                >
                                    <div className={classnames(
                                        styles["global-nav__list-item"],
                                        { [styles.active]: location.pathname === '/recipes' || location.pathname.includes('/recipe/') }

                                    )}>Recipes</div>
                                </Link>
                            </li>}
                            {user && <li >
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
                                        { [styles.active]: location.pathname === '/about' }
                                    )}>About us</div>
                                </Link>
                            </li>}
                            <li>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles[mode]
                                    )}
                                    to="/contact"
                                >
                                    <div className={classnames(
                                        styles["global-nav__list-item"],
                                        { [styles.active]: location.pathname === '/contact' }
                                    )}>Contact us</div>
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
                                        { [styles.active]: location.pathname === '/login' }
                                    )}>Login</div>
                                </Link>
                            </li>}
                            {user && <li onClick={handlerSignOut}>
                                <div
                                    onClick={handlerSignOut} className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles[mode]
                                    )}
                                > <div className={styles["global-nav__list-item"]}>Sign out</div>
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
