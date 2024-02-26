import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipesDataInterface from "./Recipes.types";
import styles from "./Recipes.module.css";
import classnames from "classnames";
import { ModeContext } from "../../providers/mode";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../api/firebase-config.js";

function Recipes() {
    const { mode } = useContext(ModeContext);

    const [recipesData, setRecipesData] = useState(null);

    const getData = () => {
        const recipesCollection = collection(db, "recipes")
        onSnapshot(recipesCollection, res => {
            const recipes = res.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))

            setRecipesData(recipes)
        })

    }
    useEffect(() => {
        getData()
    }, [])



    // useEffect(() => {
    //     fetch("/recipes.json")
    //         .then((res) => res.json())
    //         .then((data) => setRecipesData(data));
    // }, []);

    return recipesData && (
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
                        {recipesData.recipes.map((recipe) => (
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
                                    ></img>
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
