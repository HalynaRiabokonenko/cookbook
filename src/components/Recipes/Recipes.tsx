import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipesDataInterface from "./Recipes.types";
import styles from "./Recipes.module.css";
import classnames from "classnames";
import { ModeContext } from "../../providers/mode";

function Recipes() {
    const { mode } = useContext(ModeContext);
    const [recipesData, setRecipesData] = useState<RecipesDataInterface | null>(null);

    useEffect(() => {
        fetch("/recipes.json")
            .then((res) => res.json())
            .then((data) => setRecipesData(data));
    }, []);

    return recipesData && (
        <main className={styles["recipes-content"]}>
            <section className={styles["recipes-content__container"]}>
                <h1 className={styles["recipes-content__header"]}>Most popular recipes</h1>
                <p className={styles["recipes-content__paragraph"]}>
                    “A recipe has no soul. You, as the cook, must bring soul to the
                    recipe.” – Thomas Keller
                </p>
                <div className={styles["recipes_all_list"]}>
                    <div className={styles["recipes-content__recipes-list"]}>
                        {recipesData.recipes.map((recipe) => (
                            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className={styles["recipes-content__recipes-link"]}>
                                <div className={styles["recipes-content__recipes-list--option"]}>
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
