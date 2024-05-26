import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { Page } from "../../structures/Page/Page";
import { RecipesContent } from "../../structures/Recipes/RecipesContent/RecipesContent";
import { RecipesFullContent } from "../../structures/Recipes/RecipesFullContent/RecipesFullContent";
import { useParams, useNavigate } from "react-router-dom";
import RecipesNavbar from "../../structures/RecipesNavbar/RecipesNavbar";

function Recipes() {
    const navigate = useNavigate();
    const { option } = useParams<{ option: string }>();
    const [selectedOption, setSelectedOption] = useState<string | undefined>(option);

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
                <RecipesNavbar onSelectOption={handlerClickRecipesOption} />
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
export default Recipes;
