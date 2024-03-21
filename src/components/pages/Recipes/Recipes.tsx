import React, { useContext, useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { RecipesNavigation } from "../../share_structures/Recipes/RecipesNavigation/RecipesNavigation";
import { RecipesPopularContent } from "../../share_structures/Recipes/RecipesPopularContent/RecipesPopularContent";
import { RecipesContent } from "../../share_structures/Recipes/RecipesContent/RecipesContent";

function Recipes() {
    const { mode } = useContext(ModeContext);
    const [recipesType, setRecipesType] = useState<string | null>();

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
                {!recipesType && <RecipesPopularContent />}
                {recipesType && <RecipesContent option={recipesType} />}
            </div>
        </Page>
    );
}
export default Recipes;
