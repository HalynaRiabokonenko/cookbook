import React from "react";
import { useModeContext } from "../../../providers/mode";
import styles from "./AccountDeleted.module.css";
import { Page } from "../../structures/Page/Page";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PageHeader } from "../../atomic/PageHeader/PageHeader";


export const AccountDeleted = () => {
    const { mode } = useModeContext();

    return (
        <Page>
            <PageHeader>
                We will miss you!
            </PageHeader>
            <div className={classNames(
                styles["account-deleted__container--content"],
                styles[mode]
            )}>
                <div

                    className={styles["account-deleted__image-container"]}
                >
                    <img src="/images/account-deleted/woman-cry.png" className={styles["account-deleted__image"]} alt="woman crying icon" />
                </div>
                <div className={classNames(
                    styles["account-deleted__text-container"],
                    styles[mode]
                )}>
                    <h2 className={classNames(
                        styles["account-deleted__text--sub-header"],
                        styles[mode]
                    )}>Your account has been successfully deleted</h2>
                    <p className={classNames(
                        styles["account-deleted__text--paragraph"],
                        styles[mode]
                    )}>Thank you for using our service. Your account has been successfully deleted.</p>
                    <p className={classNames(
                        styles["account-deleted__text--paragraph"],
                        styles[mode]
                    )}>      However, please note that even though your account has been deleted, you can still access our <Link className={classNames(
                        styles["account-deleted__text-link"],
                        styles[mode]
                    )} to="/recipes">recipes</Link> and other content as a guest user.
                    </p>
                    <p className={classNames(
                        styles["account-deleted__text--paragraph"],
                        styles[mode]
                    )}>You can return to the <Link to="/" className={classNames(
                        styles["account-deleted__text-link"],
                        styles[mode]
                    )}>homepage</Link>.</p>
                </div>
            </div>
        </Page>
    );
};
