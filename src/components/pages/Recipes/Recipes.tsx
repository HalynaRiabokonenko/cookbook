import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import { useModeContext } from "../../../providers/mode";
import PageHeader from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import { RecipesNavigation } from "../../structures/Recipes/RecipesNavigation/RecipesNavigation";
import { RecipesContent } from "../../structures/Recipes/RecipesContent/RecipesContent";
import { RecipesFullContent } from "../../structures/Recipes/RecipesFullContent/RecipesFullContent";
import { useParams, useNavigate } from "react-router-dom";

function Recipes() {
    const { mode } = useModeContext();
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
            <PageHeader mode={mode}>Most popular recipes</PageHeader>
            <div className={styles["recipes__content"]}>
                <RecipesNavigation onSelectOption={handlerClickRecipesOption} />
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
