import React, { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import RecipeInterface from "../../../pages/Recipes/Recipes.types";
import { RecipeOption } from "../RecipeOption/RecipeOption";

export const RecipesContent = ({ option }: { option?: string }) => {
    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);

    useEffect(() => {
        let unsubscribe: () => void;

        const fetchData = async () => {
            try {
                const recipesCollection = collection(db, `${option}-recipes`);
                unsubscribe = onSnapshot(recipesCollection, (snapshot: { docs: DocumentData[] }) => {
                    const fetchedRecipes: RecipeInterface[] = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setRecipesData(fetchedRecipes);
                });
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        if (option) {
            fetchData();
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
            setRecipesData([]);
        };
    }, [option]);

    return (
        <>
            {recipesData.map((recipe, index) => (
                <div key={`${index}-${recipe.id}`}>
                    <RecipeOption recipe={recipe} />
                </div>
            ))}
        </>
    );
}
