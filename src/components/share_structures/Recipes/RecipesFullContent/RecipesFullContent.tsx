import React, { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";

const recipes: Array<string> = ["american", "georgian", "german", "indian", "italian", "japanese", "polish", "spanish", "ukrainian"];

export const RecipesFullContent = () => {
    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);

    const getData = (): void => {
        recipes.forEach((option) => {
            const recipesCollection = collection(db, `${option}-recipes`);
            onSnapshot(recipesCollection, (res: { docs: DocumentData[] }) => {
                const fetchedRecipes: RecipeInterface[] = res.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecipesData(prevState => [...prevState, ...fetchedRecipes]);
            });
        });
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            {recipesData.map((recipe) => {
                return <div key={recipe.id}><RecipeOption recipe={recipe} /></div>;
            })}
        </>
    );
};
