import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { ModeContext } from "../../providers/mode";

function Header() {
    const { mode, toggleMode } = useContext(ModeContext);
    console.log(mode);

    return (
        <header className={styles["header"]}>
            <div className={styles["header__container"]}>
                <div className={styles["logo"]}>
                    <Link className={styles["logo__link"]} to="/">
                        <img
                            alt="Logo proven recipes"
                            src="/logo.png"
                            className={styles["logo__img"]}
                        />
                    </Link>
                </div>
                <div className={styles["global-nav__container"]}>
                    <nav className={styles["global-nav"]}>
                        <ul className={styles["global-nav__list"]}>
                            <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--home"]
                                    )}
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"]
                                    )}
                                    to="/recipes"
                                >
                                    Recipes
                                </Link>
                            </li>
                            <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--about"]
                                    )}
                                    to="/about"
                                >
                                    About us
                                </Link>
                            </li>
                            <li className={styles["global-nav__list-item"]}>
                                <Link
                                    className={classnames(
                                        styles["global-nav__list-item-link"],
                                        styles["global-nav__list-item-link--contact"]
                                    )}
                                    to="/contact"
                                >
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles["global-mode__container"]}>
                    {mode === "light" ? (
                        <button

                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="./recipes_photo/mode/dark-mode.png" className={styles["global-mode__icon"]} />
                        </button>
                    ) : (
                        <button
                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="./recipes_photo/mode/light-mode.png" className={styles["global-mode__icon"]} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
