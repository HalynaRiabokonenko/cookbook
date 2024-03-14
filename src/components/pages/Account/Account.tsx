import React, { useContext } from "react";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";
import styles from "./Account.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { auth } from "../../../api/firebaseConfig";

export const Account = () => {
    const { mode } = useContext(ModeContext);

    return (<main className={styles["account__content"]}>
        <section className={classnames(
            styles["account__content-container"],
            styles[mode]
        )}>
            <PageHeader mode={mode}>
                My account
            </PageHeader>
            <div>
                <div className={classnames(
                    styles["global-nav__list-user"],
                    styles[mode]
                )}>
                    Hello, <div className={classnames(
                        styles["global-nav__list-user--detail"],
                        styles[mode]
                    )}>{auth?.currentUser?.email}</div>
                </div>
            </div>
        </section>

    </main>)
}