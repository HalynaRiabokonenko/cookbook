import React, { useContext } from "react";
import classnames from "classnames";
import { ModeContext } from "../../providers/mode";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={styles["not-found"]}>
            <div className={styles["not-found__content"]}>
                <section className={classnames(
                    styles["not-found__container"],
                    styles[mode]
                )}>
                    <h1 className={classnames(
                        styles["not-found__header"],
                        styles[mode]
                    )}>Not found</h1>

                    <div className={styles["not-found__image-container"]}>
                        {mode === "light" ? (
                            <img src="/recipes_photo/not_found/not-found--light.png" className={styles["not-found__image"]} alt="Not found image" />
                        ) : (
                            <img src="/recipes_photo/not_found/not-found--dark.png" className={styles["not-found__image"]} alt="Not found image" />
                        )}
                    </div>

                    <div className={styles["not-found__link-container"]}>
                        <Link to="/" className={classnames(
                            styles["not-found__home-link"],
                            styles[mode]
                        )}>
                            Home Page
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default NotFound;

