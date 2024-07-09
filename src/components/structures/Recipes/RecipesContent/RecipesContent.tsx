import React, { useEffect, useState } from "react";
import { DocumentData, collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import { RecipeOption } from "../RecipeOption/RecipeOption";
import { Recipe } from "../../../../commons/types/Recipe";
import { User } from "firebase/auth";

interface RecipesContentProps {
    user: User | null;
    option?: string
}

export const RecipesContent = ({ user, option }: RecipesContentProps) => {
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
                <div key={Math.floor(Math.random() * Date.now())}>
                    <RecipeOption recipe={recipe} user={user} />
                </div>
            ))}
        </>
    );
};
