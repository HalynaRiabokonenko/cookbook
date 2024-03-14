import React, { useContext } from "react";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import Button from "../../share_atomic/Button/Button";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";

const NotFound = () => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={styles["not-found"]}>
            <div className={styles["not-found__content"]}>
                <section className={classnames(
                    styles["not-found__container"],
                    styles[mode]
                )}>
                    <PageHeader mode={mode}>
                        Not found
                    </PageHeader>
                    <div className={styles["not-found__image-container"]}>
                        {mode === "light" ? (
                            <img src="/images/not_found/not-found--light.png" className={styles["not-found__image"]} alt="Not found image" />
                        ) : (
                            <img src="/images/not_found/not-found--dark.png" className={styles["not-found__image"]} alt="Not found image" />
                        )}
                    </div>

                    <div className={styles["not-found__link-container"]}>
                        <Link to="/">
                            <Button mode={mode}>
                                Home Page
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default NotFound;

