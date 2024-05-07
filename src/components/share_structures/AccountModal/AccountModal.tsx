import React from "react";
import styles from "./AccountModal.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";

interface AccountModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountModal = ({ setIsModalOpen }: AccountModalProps) => {
    const { mode } = useModeContext();
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
                    )} onClick={() => { navigate("/account") }}>Account
                    </li>
                    <li className={classnames(
                        styles["account-modal__list-option"],
                        styles[mode]
                    )} onClick={() => { navigate("/contact") }}>Support
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