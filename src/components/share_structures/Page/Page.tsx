import React, { PropsWithChildren, useContext } from "react";
import styles from "./Page.module.css";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";

export const Page = ({ children }: PropsWithChildren) => {
    const { mode } = useContext(ModeContext);

    return (
        <main className={styles["page"]}>
            <div className={styles["page-content"]}>
                <section className={classnames(
                    styles["page-content__container"],
                    styles[mode]
                )}>
                    {children}
                </section>
            </div>
        </main>
    );
}