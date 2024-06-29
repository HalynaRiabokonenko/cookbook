import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { RecipeOption } from '../../structures/Recipes/RecipeOption/RecipeOption';
import { Recipe } from '../../../commons/types/Recipe';
import { Page } from '../../structures/Page/Page';
import { PageHeader } from '../../atomic/PageHeader/PageHeader';
import { db } from '../../../api/firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

interface FavoritesProps {
    user: User | null;
}

export const Favorites = ({ user }: FavoritesProps) => {
    const [favoritesData, setFavoritesData] = useState<Recipe[]>([]);

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

                setFavoritesData(favorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [user]);

    console.log("FAVORITES", JSON.stringify(favoritesData));

    return (
        <Page>
            <PageHeader>Favorite Recipes</PageHeader>
            {favoritesData.length > 0 ? (
                favoritesData.map((recipe) => (
                    <RecipeOption key={Math.floor(Math.random() * Date.now())} recipe={recipe} />
                ))
            ) : (
                <div className='flex w-full items-center justify-center'>No favorite recipes found.</div>
            )}
        </Page>
    );
};
