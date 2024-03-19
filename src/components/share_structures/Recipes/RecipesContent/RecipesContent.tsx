import React, { useContext, useEffect, useState } from "react";
import { ModeContext } from "../../../../providers/mode";
import styles from "./RecipesContent.module.css";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../api/firebaseConfig";
import RecipesContentInterface from "./RecipesContent.types";

export const RecipesContent = ({ type }: { type: string }) => {
    const { mode } = useContext(ModeContext);
    const [recipesData, setRecipesData] = useState<RecipesContentInterface[]>([]);

    const getData = (): void => {
        const recipesCollection = collection(db, `${type}-recipes`)
        onSnapshot(recipesCollection, (res: { docs: DocumentData[] }) => {
            const recipes: RecipesContentInterface[] = res.docs.map(doc => ({
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
        <>
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
        </>
    )
}