import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import { AccountModal } from "../AccountModal/AccountModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
interface HeaderProps {
    user: User | null;
}

function Header({ user }: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mode, toggleMode } = useModeContext();
    const location = useLocation();
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

    const toggleAccountModal = (): void => {
        setIsModalOpen((prevState) => (prevState === false ? true : false));
    };

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        }

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);


    useEffect(() => {
        const handleClickOutsideAccountModal = (event: MouseEvent) => {
            if (event.target && !(event.target as HTMLElement).closest("#header__account-container") &&
                !(event.target as HTMLElement).closest("#account-modal__container")) {
                setIsModalOpen(false);
            }
        };

        document.body.addEventListener("click", handleClickOutsideAccountModal);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideAccountModal);
        };
    }, []);


    useEffect(() => {
        if (!user) {
            console.error("User is empty");
            return;
        }

        const fetchUserData = async () => {
            try {
                setUserPhotoUrl(null);
                const docRef = doc(db, `userData/${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserPhotoUrl(docSnap.data().photo);
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <header className={styles["header"]}>
            <div className={classnames(
                styles["header__container"],
                styles[mode]
            )}>
                <div className={styles["header__logo"]}>
                    <Link className={styles["header__logo__link"]} to="/">
                        <div className={styles["logo__link__container"]}>
                            {mode === "light" ? (
                                <img src="/images/logo/chef-dark.png" alt="Proven Recipes logo" className={classnames(
                                    styles["logo__img"],
                                    styles[mode])} />
                            ) : (
                                <img src="/images/logo/chef.png" alt="Proven Recipes logo" className={classnames(
                                    styles["logo__img"],
                                    styles[mode]
                                )} />
                            )}
                        </div>
                        <div className={classnames(
                            styles["header__name"],
                            styles[mode])}>
                            <p>Proven recipes</p>
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
                {user && <div id="header__account-container" className={styles["header__account-container"]} onClick={toggleAccountModal}
                >
                    {userPhotoUrl &&
                        <Avatar className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            <AvatarImage
                                className="w-full h-full object-cover"
                                src={userPhotoUrl}
                                alt="User profile picture"
                            />
                        </Avatar>
                    }
                    {!userPhotoUrl &&
                        <div

                            className={styles["header__account-button"]}
                        >
                            {mode === "light" ?
                                (<img src="/images/account/account-light.png" className={styles["header__account-icon"]} alt="header account icon" />)
                                :
                                (<img src="/images/account/account-dark.png" className={styles["header__account-icon"]} alt="header account icon" />)
                            }
                        </div>}
                </div>}
                <div className={styles["global-mode__container"]}>
                    {mode === "light" ? (
                        <button

                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/images/mode/night-mode.png" className={styles["global-mode__icon"]} alt="dark mode icon" />
                        </button>
                    ) : (
                        <button
                            onClick={toggleMode} className={styles["global-mode__button"]}
                        >
                            <img src="/images/mode/light-mode.png" className={styles["global-mode__icon"]} alt="light mode icon" />
                        </button>
                    )}
                </div>
                {isModalOpen && <AccountModal setIsModalOpen={setIsModalOpen}></AccountModal>}
            </div>
        </header >
    );
}

export default Header;
