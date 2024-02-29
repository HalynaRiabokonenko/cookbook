import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeInterface from "./Recipes.types";
import styles from "./Recipes.module.css";
import classnames from "classnames";
import { ModeContext } from "../../providers/mode";
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../api/firebaseConfig";

function Recipes() {
    const { mode } = useContext(ModeContext);

    const [recipesData, setRecipesData] = useState<RecipeInterface[]>([]);

    const getData = (): void => {
        const recipesCollection = collection(db, "recipes")
        onSnapshot(recipesCollection, (res: { docs: DocumentData[] }) => {
            const recipes: RecipeInterface[] = res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRecipesData(recipes);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className={styles["recipes-content"]}>
            <section className={classnames(
                styles["recipes-content__container"],
                styles[mode]
            )}>
                <h1 className={styles["recipes-content__header"]}>Most popular recipes</h1>
                <p className={styles["recipes-content__paragraph"]}>
                    “A recipe has no soul. You, as the cook, must bring soul to the
                    recipe.” – Thomas Keller
                </p>
                <div className={styles["recipes_all_list"]}>
                    <div className={styles["recipes-content__recipes-list"]}>
                        {recipesData.map((recipe) => (
                            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className={classnames(
                                styles["recipes-content__recipes-link"],
                                styles[mode]
                            )}>
                                <div className={classnames(
                                    styles["recipes-content__recipes-list--option"],
                                    styles[mode]
                                )}>
                                    <img
                                        src={recipe.photoPath}
                                        alt={recipe.name}
                                        className={styles["recipes-content__recipes-photo"]}
                                    />
                                    <h2 className={styles["recipes-content__recipes-name"]}>
                                        {recipe.name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Recipes;
