import React, { useContext, useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { RecipesContent } from "../../share_structures/Recipes/RecipesContent/RecipesContent";
import { RecipesNavigation } from "../../share_structures/Recipes/RecipesNavigation/RecipesNavigation";

function Recipes() {
    const { mode } = useContext(ModeContext);
    const [recipesType, setRecipesType] = useState<string>("american");
    console.log("RECIPES TYPE:", recipesType);

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
                <div className={styles["recipes_all_list"]} >
                    <RecipesContent type={recipesType}></RecipesContent>
                </div>
            </div>
        </Page>
    );
}
export default Recipes;
