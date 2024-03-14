import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";

interface Props {
    user: User | null;
}

const Footer: React.FC<Props> = ({ user }: Props) => {
    const { mode } = useContext(ModeContext);

    return (
        <footer className={classnames(
            styles["footer"],
            styles[mode]
        )}>
            <div className={styles["footer-content"]}>
                <div className={styles["footer__brand"]}>
                    {mode === "light" ? (
                        <img src="/images/logo/logo-white.png" alt="Proven Recipes logo" className={styles["footer__brand-logo"]} />
                    ) : (
                        <img src="/images/logo/logo-dark.png" alt="Proven Recipes logo" className={styles["footer__brand-logo"]} />
                    )}
                    <h2 className={styles["footer__brand-name"]}>Proven Recipes</h2>
                </div>
                <div className={classnames(
                    styles["footer-links"],
                    styles[mode]
                )}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {user && <li>
                            <Link to="/about">About Us</Link>
                        </li>}
                        {user && <li>
                            <Link to="/recipes">Recipes</Link>
                        </li>}
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles["footer-social"]} >
                    <p>Let's be friends!</p>
                    <ul>
                        <li>
                            <a
                                href="https://www.instagram.com/proven.recipes"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className={styles["footer__social-icon"]}
                                    src="/images/social/instagram-icon.png"
                                    alt="Instagram icon"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles["footer__bottom"]}>
                <p className={styles["footer__copy"]}>
                    &copy; {new Date().getFullYear()} Proven Recipes. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
