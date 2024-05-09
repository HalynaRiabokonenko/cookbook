import React, { useState } from "react";
import styles from "./UppButton.module.css"
import classNames from "classnames";
import { useModeContext } from "../../../providers/mode";

export const UpButton = () => {
    const { mode } = useModeContext();
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classNames(
            styles["up-button-container"],
            { [styles['show']]: isVisible, [styles['hide']]: !isVisible }
        )}>
            <button onClick={scrollToTop} className={classNames(
                styles["up-button"],
                styles[mode]
            )}>
                {mode === "light" ? (
                    <img src="/images/up-button/up-light.png" alt="Up icon" className={classNames(
                        styles["up-button__img"],
                        styles[mode])} />
                ) : (
                    <img src="/images/up-button/up-dark.png" alt="Up icon" className={classNames(
                        styles["up-button__img"],
                        styles[mode])} />
                )}</button>
        </div >
    )
}