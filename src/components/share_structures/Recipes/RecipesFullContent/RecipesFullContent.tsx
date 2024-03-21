import React, { useEffect, useState, useRef } from "react";
import { DocumentData, collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";

const recipes: Array<string> = ["american", "georgian", "german", "indian", "italian", "japanese", "polish", "spanish", "ukrainian"];

export const RecipesFullContent = () => {
    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);
    const unsubscribeRefs = useRef<Unsubscribe[]>([]);

    const getData = (): void => {
        recipes.forEach((option) => {
            const recipesCollection = collection(db, `${option}-recipes`);
            const unsubscribe = onSnapshot(recipesCollection, (res: { docs: DocumentData[] }) => {
                const fetchedRecipes: RecipeInterface[] = res.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecipesData(prevState => [...prevState, ...fetchedRecipes]);
            });
            unsubscribeRefs.current.push(unsubscribe);
        });
    };

    useEffect(() => {
        getData();
        return () => {
            unsubscribeRefs.current.forEach(unsubscribe => unsubscribe());
        };
    }, []);


    return (
        <>
            {recipesData.map((recipe, id) => {
                return <div key={`${id}-${recipe.id}`}><RecipeOption recipe={recipe} /></div>;
            })}
        </>
    );
};
