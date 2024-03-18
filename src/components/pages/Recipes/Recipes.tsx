import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeInterface from "./Recipes.types";
import styles from "./Recipes.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../../api/firebaseConfig";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";

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
        <Page>
            <PageHeader mode={mode}>
                Most popular recipes
            </PageHeader>
            <div className={styles["recipes__content"]}>
                <aside className={styles["recipes__aside"]}>
                    {/* <h3 className={styles["recipes__aside-header"]}>Recipe categories</h3> */}
                    <ul className={styles["recipes__aside-list"]}>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/american">American Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/georgian">Georgian Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/german">German Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/indian">Indian Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/italian">Italian Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/japanese">Japanese Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/polish">Polish Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/spanish">Spanish Recipes</Link></li>
                        <li className={styles["recipes__aside-list-option"]}><Link className={styles["recipes__aside-list-option-link"]} to="/recipes/ukrainian">Ukrainian Recipes</Link></li>
                    </ul>
                </aside>
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
                                    <div className={styles["recipes-content__recipes-photo-container"]}>
                                        <img
                                            src={recipe.photoPath}
                                            alt={recipe.name}
                                            className={styles["recipes-content__recipes-photo"]}
                                        />
                                    </div>
                                    <div className={styles["recipes-content__recipes-container"]}>
                                        <h2 className={styles["recipes-content__recipes-name"]}>
                                            {recipe.name}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
}
export default Recipes;
