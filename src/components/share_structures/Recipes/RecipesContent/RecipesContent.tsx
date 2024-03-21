import React, { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import { RecipeOption } from "../RecipeOption/RecipeOption";

export const RecipesContent = ({ option }: { option?: string }) => {

    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);

    const getData = (): void => {
        const recipesCollection = collection(db, `${option}-recipes`)
        onSnapshot(recipesCollection, (res: { docs: DocumentData[] }) => {
            const recipes: RecipeInterface[] = res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRecipesData(recipes);
        });
    };

    useEffect(() => {
        getData();
    }, [option]);

    return (
        <>
            {recipesData.map((recipe) => (
                <RecipeOption recipe={recipe} />
            ))}
        </>
    )
}