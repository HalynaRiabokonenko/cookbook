import React, { useState, useEffect } from "react";
import styles from "./UppButton.module.css";
import classNames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { ChevronUp } from 'react-feather';

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

    useEffect(() => {
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
                <ChevronUp className='w-6 h-6 text-white' />
            </button>
        </div>
    );
}
