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
    const [recipesType, setRecipesType] = useState<string | null>();
    const location = useLocation();

    const handlerClickRecipesOption = (option: string): void => {
        setRecipesType(option);
    }

    return (
        <Page>
            <PageHeader mode={mode}>
                Most popular recipes
            </PageHeader>
            <div className={styles["recipes__content"]}>
                <RecipesNavigation onSelectOption={handlerClickRecipesOption}></RecipesNavigation>
                <div className={styles["recipes__content-container"]}>
                    {location.pathname === "/recipes" && <RecipesFullContent />}
                    {recipesType && <RecipesContent option={recipesType} />}
                </div>
            </div>
        </Page>
    );
}
export default Recipes;
