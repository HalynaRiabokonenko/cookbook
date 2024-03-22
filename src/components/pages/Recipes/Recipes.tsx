// Recipes.tsx

import React, { useContext, useState } from "react";
import styles from "./Recipes.module.css";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { RecipesNavigation } from "../../share_structures/Recipes/RecipesNavigation/RecipesNavigation";
import { RecipesContent } from "../../share_structures/Recipes/RecipesContent/RecipesContent";
import { RecipesFullContent } from "../../share_structures/Recipes/RecipesFullContent/RecipesFullContent";
import { useLocation } from "react-router-dom";

function Recipes() {
    const { mode } = useContext(ModeContext);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Changed null to undefined

    const handlerClickRecipesOption = (option: string): void => {
        setSelectedOption(option);
    };

    return (
        <Page>
            <PageHeader mode={mode}>Most popular recipes</PageHeader>
            <div className={styles["recipes__content"]}>
                <RecipesNavigation onSelectOption={handlerClickRecipesOption} />
                <div className={styles["recipes__content-container"]}>
                    {location.pathname === "/recipes" ? (
                        <RecipesFullContent />
                    ) : (
                        <RecipesContent option={selectedOption} />
                    )}
                </div>
            </div>
        </Page>
    );
}
export default Recipes;
