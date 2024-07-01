import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import { HeaderNavbar } from "../HeaderNavbar/HeaderNavbar";
import { HeaderHamburgerMenu } from "../HamburgerMenu.tsx/HeaderHamburgerMenu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { HeaderUserMenu } from "../HeaderUserMenu/HeaderUserMenu";

interface HeaderProps {
    user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mode, toggleMode } = useModeContext();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const toggleAccountModal = (): void => {
        setIsModalOpen((prevState) => (prevState === false ? true : false));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
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
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header>
            <div className={classnames(
                styles["header__container"],
                styles[mode]
            )}>
                <div className={styles["header__logo"]}>
                    <Link className="flex flex-row items-center" to="/">
                        <div className="flex items-center justify-center mx-[40px]">
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
                            Proven recipes
                        </div>
                    </Link>
                </div>
                <div className="flex">
                    {!isMobile && <HeaderNavbar user={user} />}
                    {user && !isMobile &&
                        <div id="header__account-container" className="m-auto flex justify-center items-center h-full" onClick={toggleAccountModal}
                        >
                            <HeaderUserMenu user={user} />
                        </div>
                    }
                    <div className="m-auto flex justify-center items-center h-full mr-2 sm:mr-9">
                        {mode === "light" ? (
                            <button

                                onClick={toggleMode} className="border-none bg-none cursor-pointer flex justify-center items-center hover:bg-optionHover rounded p-2.5 rounded-xl bg-inherit leading-6"
                            >
                                <MoonIcon width="25" height="25" />
                            </button>
                        ) : (
                            <button
                                onClick={toggleMode} className="border-none bg-none cursor-pointer flex justify-center items-center hover:bg-optionHoverDark rounded p-2.5 rounded-xl bg-inherit leading-6"
                            >
                                <SunIcon width="25" height="25" />
                            </button>
                        )}
                    </div>
                </div>

                {isMobile && <HeaderHamburgerMenu user={user} />}
            </div>
        </header >
    );
}