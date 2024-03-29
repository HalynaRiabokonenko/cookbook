import React, { useEffect, useState, useRef } from "react";
import { DocumentData, collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";

const recipes: Array<string> = ["american", "georgian", "german", "indian", "italian", "japanese", "polish", "spanish", "ukrainian"];

export const RecipesFullContent = () => {
    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);
    const unsubscribeRefs = useRef<Unsubscribe[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const unsubscribeFunctions: Unsubscribe[] = [];
            try {
                for (const option of recipes) {
                    const recipesCollection = collection(db, `${option}-recipes`);
                    const unsubscribe = onSnapshot(recipesCollection, (snapshot: { docs: DocumentData[] }) => {
                        const fetchedRecipes: RecipeInterface[] = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setRecipesData(prevRecipes => [...prevRecipes, ...fetchedRecipes]);
                    });
                    unsubscribeFunctions.push(unsubscribe);
                }
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
            unsubscribeRefs.current = unsubscribeFunctions;
        };

        fetchData();

        return () => {
            unsubscribeRefs.current.forEach(unsubscribe => unsubscribe());
        };
    }, []);

    return (
        <>
            {recipesData.map((recipe, index) => (
                <div key={`${index}-${recipe.id}`}>
                    <RecipeOption recipe={recipe} />
                </div>
            ))}
        </>
    );
};
