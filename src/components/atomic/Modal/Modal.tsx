import React from "react";
import styles from "./Modal.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";

export const Modal = ({ children }: { children: React.ReactNode; }) => {
    const { mode } = useModeContext();

    return (
        <div className={classnames(styles["modal-overlay"], styles[mode])}>
            <div id="modal__content--container" className={classnames(
                styles["modal__content--container"],
                styles[mode]
            )}>
                {children}
            </div>
        </div>
    )
}