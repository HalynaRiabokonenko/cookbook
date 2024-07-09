import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { RecipeOption } from '../../structures/Recipes/RecipeOption/RecipeOption';
import { Recipe } from '../../../commons/types/Recipe';
import { Page } from '../../structures/Page/Page';
import { PageHeader } from '../../atomic/PageHeader/PageHeader';
import { db } from '../../../api/firebaseConfig';
import { collection, getDocs, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';

interface FavoritesProps {
    user: User | null;
}

export const Favorites = ({ user }: FavoritesProps) => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;

            const userId = user.uid;

            try {
                const favoritesRef = collection(db, `userFavorites/${userId}/cuisines`);
                const snapshot = await getDocs(favoritesRef);

                const favorites: Recipe[] = [];
                snapshot.forEach((doc) => {
                    const cuisine = doc.id;
                    const data = doc.data() as DocumentData;
                    Object.keys(data).forEach((key) => {
                        if (key !== "id") {
                            favorites.push({
                                cuisine: cuisine,
                                id: data[key].toString(),
                            } as Recipe);
                        }
                    });
                });

                const fetchData = () => {
                    try {
                        const recipesCollection = collection(db, `recipes`);
                        return onSnapshot(recipesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                            const fetchedRecipes: Recipe[] = [];
                            snapshot.docs.forEach(doc => {
                                const data = doc.data();
                                favorites.forEach(option => {
                                    if (doc.id === option.cuisine) {
                                        Object.keys(data).forEach((key) => {
                                            if (key === option.id) {
                                                fetchedRecipes.push({
                                                    id: key,
                                                    ...data[key]
                                                });
                                            }
                                        });
                                    }
                                });
                            });
                            setRecipesData(fetchedRecipes);
                        });
                    } catch (error) {
                        console.error("Error fetching recipes:", error);
                    }
                };

                const unsubscribe = fetchData();

                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [user]);

    return (
        <Page>
            <PageHeader>Favorite Recipes</PageHeader>
            <div className="flex flex-col m-2">
                <div className="flex flex-wrap justify-evenly gap-5">
                    {recipesData.length > 0 ? (
                        recipesData.map((recipe) => (
                            <RecipeOption user={user} key={Math.floor(Math.random() * Date.now())} recipe={recipe} />
                        ))
                    ) : (
                        <div className='flex flex-col'>
                            <div className='flex w-full items-center justify-center text-2xl'>No favorite recipes found</div>
                            <img src="/images/recipes/empty.png" alt="user photo icon" />
                        </div>

                    )}
                </div>
            </div>

        </Page>
    );
};
