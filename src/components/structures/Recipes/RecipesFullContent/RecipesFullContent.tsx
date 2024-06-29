import React, { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";
import { Recipe } from "../../../../commons/types/Recipe";

export const RecipesFullContent = () => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
            const fetchedRecipes: Recipe[] = [];
            snapshot.docs.forEach((doc) => {
                const data = doc.data() as DocumentData;
                Object.keys(data).forEach((key) => {
                    if (key !== "id") {
                        fetchedRecipes.push({
                            id: key,
                            ...data[key]
                        });
                    }
                });
            });
            setRecipesData(fetchedRecipes);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {recipesData.map((recipe) => (
                <div key={Math.floor(Math.random() * Date.now())}>
                    <RecipeOption recipe={recipe} />
                </div>
            ))}
        </>
    );
};
