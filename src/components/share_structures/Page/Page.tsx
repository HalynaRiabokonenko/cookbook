import React, { PropsWithChildren, useContext } from "react";
import styles from "./Page.module.css";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";

export const Page = ({ children }: PropsWithChildren) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={styles["page"]}>
            <main className={styles["page-content"]}>
                <section className={classnames(
                    styles["page-content__container"],
                    styles[mode]
                )}>
                </section>
                {children}
            </main>
        </div>
    );
}