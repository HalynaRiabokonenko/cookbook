import React, { useEffect, useState } from "react";
import { Page } from "../../structures/Page/Page";
import { RecipesContent } from "../../structures/Recipes/RecipesContent/RecipesContent";
import { RecipesFullContent } from "../../structures/Recipes/RecipesFullContent/RecipesFullContent";
import { useParams, useNavigate } from "react-router-dom";
import { RecipesHamburgerMenu } from "../../structures/RecipesHamburgerMenu.tsx/RecipesHamburgerMenu";
import { PageHeader } from "../../atomic/PageHeader/PageHeader";

const MOBILE_WIDTH = 600;

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
            {isMobile &&
                <RecipesHamburgerMenu onSelectOption={handlerClickRecipesOption} />
            }
            <PageHeader>
                {selectedOption ? `${selectedOption} recipes` : 'All recipes'}
            </PageHeader>
            <div className="flex flex-col m-8">
                <div className="flex flex-wrap justify-evenly gap-5">
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
