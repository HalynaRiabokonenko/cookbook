import React from "react";
import { useModeContext } from "../../../providers/mode";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import Button from "../../share_atomic/Button/Button";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";

const NotFound = () => {
    const { mode } = useModeContext();

    return (
        <Page>
            <PageHeader mode={mode}>
                Not found
            </PageHeader>
            <div className={styles["not-found__image-container"]}>
                {mode === "light" ? (
                    <img src="/images/not_found/not-found--light.png" className={styles["not-found__image"]} alt="Not found" />
                ) : (
                    <img src="/images/not_found/not-found--dark.png" className={styles["not-found__image"]} alt="Not found" />
                )}
            </div>

            <div className={styles["not-found__link-container"]}>
                <Link to="/">
                    <Button>
                        Home Page
                    </Button>
                </Link>
            </div>
        </Page>

    )
}

export default NotFound;

