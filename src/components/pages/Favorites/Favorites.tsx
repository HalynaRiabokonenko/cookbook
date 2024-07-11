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
    const [favoritesMap, setFavoritesMap] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;

            const userId = user.uid;

            try {
                const favoritesRef = collection(db, `userFavorites/${userId}/cuisines`);
                const snapshot = await getDocs(favoritesRef);

                const favorites: { cuisine: string; id: string }[] = [];
                const favMap: { [key: string]: boolean } = {};

                snapshot.forEach((doc) => {
                    const cuisine = doc.id;
                    const data = doc.data() as DocumentData;
                    if (data.recipes && Array.isArray(data.recipes)) {
                        data.recipes.forEach((recipeId: string) => {
                            favorites.push({ cuisine, id: recipeId });
                            favMap[recipeId] = true;
                        });
                    }
                });

                console.log('Favorites:', favorites);
                console.log('Favorites Map:', favMap);

                const fetchData = () => {
                    try {
                        const recipesCollection = collection(db, `recipes`);
                        return onSnapshot(recipesCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                            const fetchedRecipes: Recipe[] = [];

                            snapshot.docs.forEach(doc => {
                                const data = doc.data();
                                console.log('Processing cuisine:', doc.id, 'data:', data);

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

                            console.log('Fetched Recipes:', fetchedRecipes);
                            setRecipesData(fetchedRecipes);
                            setFavoritesMap(favMap);
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
                console.error("Error fetching favorites:", error);
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
                        recipesData.map((recipe, index) => (
                            <RecipeOption
                                user={user}
                                key={`${recipe.id}-${index}`}
                                recipe={recipe}
                                isAddedToFavorite={favoritesMap[recipe.id]}
                            />
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
