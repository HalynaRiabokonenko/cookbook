import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { Page } from "../../structures/Page/Page";
import { RecipesContent } from "../../structures/Recipes/RecipesContent/RecipesContent";
import { RecipesFullContent } from "../../structures/Recipes/RecipesFullContent/RecipesFullContent";
import { useParams, useNavigate } from "react-router-dom";
import RecipesNavbar from "../../structures/RecipesNavbar/RecipesNavbar";
import { RecipesHamburgerMenu } from "../../structures/RecipesHamburgerMenu.tsx/RecipesHamburgerMenu";

const MOBILE_WIDTH = 756;

export const Recipes = () => {
    const navigate = useNavigate();
    const { option } = useParams<{ option: string }>();
    const [selectedOption, setSelectedOption] = useState<string | undefined>(option);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_WIDTH);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlerClickRecipesOption = (option: string): void => {
        setSelectedOption(option);
        navigate(`/recipes/${option}`);
    };

    useEffect(() => {
        setSelectedOption(option);
    }, [option]);

    return (
        <Page>
            <div className={styles["recipes__content"]}>
                {isMobile ?
                    <RecipesHamburgerMenu onSelectOption={handlerClickRecipesOption} />
                    :
                    <RecipesNavbar onSelectOption={handlerClickRecipesOption} />
                }
                <div className={styles["recipes__content-container"]}>
                    {selectedOption ? (
                        <RecipesContent option={selectedOption} />
                    ) : (
                        <RecipesFullContent />
                    )}
                </div>
            </div>
        </Page>
    );
}
