import React, { PropsWithChildren, useContext } from "react";
import { ModeContext } from "../../../../providers/mode";
import styles from "./RecipesNavigation.module.css";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

interface RecipesNavigationProps {
    onSelectOption: (option: string) => void;
}

export const RecipesNavigation = ({ onSelectOption }: RecipesNavigationProps) => {
    const { mode } = useContext(ModeContext);
    // const location = useLocation();
    // console.log("RECIPES LOCATION:", location);

    const handleOptionSelect = (option: string) => {
        onSelectOption(option);
    };

    return (
        <>
            <aside className={styles["recipes__aside"]}>
                <ul className={classnames(
                    styles["recipes__aside-list"],
                    styles[mode]
                )}>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('american')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/american">American Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('georgian')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/georgian">Georgian Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('german')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/german">German Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('indian')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/indian">Indian Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('italian')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/italian">Italian Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('japanese')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/japanese">Japanese Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('polish')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/polish">Polish Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('spanish')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/spanish">Spanish Recipes</Link></li>
                    <li className={classnames(
                        styles["recipes__aside-list-option"],
                        styles[mode]
                    )} onClick={() => handleOptionSelect('ukrainian')}><Link className={classnames(
                        styles["recipes__aside-list-option-link"],
                        styles[mode]
                    )} to="/recipes/ukrainian">Ukrainian Recipes</Link></li>
                </ul>
            </aside>
        </>
    )
}