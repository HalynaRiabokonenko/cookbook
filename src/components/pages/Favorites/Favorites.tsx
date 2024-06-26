import React, { useEffect, useState } from 'react';
import { auth, db } from "../../../api/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import { RecipeOption } from '../../structures/Recipes/RecipeOption/RecipeOption';
import { Recipe } from '../../../commons/types/Recipe';
import { Page } from '../../structures/Page/Page';
import { PageHeader } from '../../atomic/PageHeader/PageHeader';
import { User } from 'firebase/auth';

interface FavoritesProps {
    user: User | null;
}

export const Favorites = ({ user }: FavoritesProps) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                const userRef = collection(db, 'users', user.uid, 'favorites');
                const snapshot = await getDocs(userRef);
                const fetchedFavorites = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Recipe[];
                setFavorites(fetchedFavorites);
            }
        };

        fetchFavorites();
    }, [user]);

    return (
        <Page>
            <PageHeader>Your Favorites</PageHeader>
            <div>
                {favorites.map((recipe) => (
                    <RecipeOption key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </Page>
    );
};
