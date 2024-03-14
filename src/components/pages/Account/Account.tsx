import React, { useContext } from "react";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";
import styles from "./Account.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";

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
            </div>
        </section>

    </main>)
}