import React, { useContext } from "react";
import styles from "./AccountModal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { Link } from "react-router-dom";

export const AccountModal = () => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={classnames(
            styles["account-modal__container"],
            styles[mode]
        )}>
            <div className={classnames(
                styles["account-modal__list-container"],
                styles[mode]
            )}>
                <ul className={styles["account-modal__list"]}>
                    <li className={classnames(
                        styles["account-modal__list-option"],
                        styles[mode]
                    )}>
                        <Link to="/account">My account</Link>
                    </li>
                    <li className={classnames(
                        styles["account-modal__list-option"],
                        styles[mode]
                    )}>Sign out</li>
                </ul>
            </div>
        </div>
    )
}