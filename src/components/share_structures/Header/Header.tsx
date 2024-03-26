import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import { AccountModal } from "../AccountModal/AccountModal";

interface HeaderProps {
    user: User | null;
}

function Header({ user }: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mode, toggleMode } = useContext(ModeContext);
    const location = useLocation();

    const toggleAccountModal = (): void => {
        setIsModalOpen((prevState) => (prevState === false ? true : false));
    };

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
                                <img src="/images/logo/logo-grey.png" alt="Proven Recipes logo" className={classnames(
                                    styles["logo__img"],
                                    styles[mode])} />
                            ) : (
                                <img src="/images/logo/logo-dark.png" alt="Proven Recipes logo" className={classnames(
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
                                        { [styles.active]: location.pathname === '/about' }
                                    )}>About us</div>
                                </Link>
                            </li>
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
                                        { [styles.active]: location.pathname === '/login' || location.pathname === '/sign-up' }
                                    )}>Login</div>
                                </Link>
                            </li>}
                        </ul>
                    </nav>
                </div>
                {user && <div className={styles["header__account-container"]} onClick={toggleAccountModal}
                >
                    {mode === "light" ? (
                        <div

                            className={styles["header__account-button"]}
                        >
                            <img src="/images/account/account-light.png" className={styles["header__account-icon"]} alt="header account icon" />
                        </div>
                    ) : (
                        <div
                            className={styles["header__account-button"]}
                        >
                            <img src="/images/account/account-dark.png" className={styles["header__account-icon"]} alt="header account icon" />
                        </div>
                    )}
                </div>}
                <div className={styles["global-mode__container"]}>
                    {mode === "light" ? (
                        <button

                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/images/mode/dark.png" className={styles["global-mode__icon"]} alt="dark mode icon" />
                        </button>
                    ) : (
                        <button
                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/images/mode/light.png" className={styles["global-mode__icon"]} alt="light mode icon" />
                        </button>
                    )}
                </div>
                {isModalOpen && <AccountModal setIsModalOpen={setIsModalOpen}></AccountModal>}
            </div>
        </header >
    );
}

export default Header;
