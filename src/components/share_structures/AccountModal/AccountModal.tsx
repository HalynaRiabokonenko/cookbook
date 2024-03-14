import React, { useContext } from "react";
import styles from "./AccountModal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";

interface AccountModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountModal = ({ setIsModalOpen }: AccountModalProps) => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    const handlerSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/login");
            })
            .catch(error => {
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <div className={classnames(
            styles["account-modal__container"],
            styles[mode]
        )}>
            <div className={classnames(
                styles["account-modal__list-container"],
                styles[mode]
            )}>
                <ul className={styles["account-modal__list"]} onClick={() => setIsModalOpen(false)}>
                    <li className={classnames(
                        styles["account-modal__list-option"],
                        styles[mode]
                    )} onClick={() => { navigate("/account") }}>My account
                    </li>
                    <li className={classnames(
                        styles["account-modal__list-option"],
                        styles[mode]
                    )} onClick={handlerSignOut}>Sign out</li>
                </ul>
            </div>
        </div>
    )
}