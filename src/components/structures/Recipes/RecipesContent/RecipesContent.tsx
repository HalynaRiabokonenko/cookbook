import React, { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";
import { Recipe } from "../../../../commons/types/Recipe";

export const RecipesContent = ({ option }: { option?: string }) => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([]);

    useEffect(() => {
        let unsubscribe: () => void;

        const fetchData = async () => {
            try {
                const recipesCollection = collection(db, `recipes`);
                unsubscribe = onSnapshot(recipesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                    const fetchedRecipes: Recipe[] = [];
                    snapshot.docs.forEach(doc => {
                        const data = doc.data();
                        if (doc.id === option) {
                            Object.keys(data).forEach((key) => {
                                if (key !== "id") {
                                    fetchedRecipes.push({
                                        id: key,
                                        ...data[key]
                                    });
                                }
                            });
                        }
                    });
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
            {recipesData.map((recipe) => (
                <div key={recipe.id}>
                    <RecipeOption recipe={recipe} />
                </div>
            ))}
        </>
    );
};
