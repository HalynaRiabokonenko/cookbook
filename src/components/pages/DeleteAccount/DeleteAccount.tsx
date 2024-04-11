import React, { useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./DeleteAccount.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { auth } from "../../../api/firebaseConfig";
import { User, deleteUser } from "firebase/auth";
import classNames from "classnames";
import Button from "../../share_atomic/Button/Button";
import { Page } from "../../share_structures/Page/Page";
import { useNavigate } from "react-router-dom";
import { Input } from "../../share_atomic/Input/Input";

interface DeleteAccountProps {
    user: User | null;
}

export const DeleteAccount = ({ user }: DeleteAccountProps) => {
    const { mode } = useContext(ModeContext);
    const email = user?.email;
    const [currentEmail, setCurrentEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        if (currentUser && email === currentEmail) {
            try {
                await deleteUser(currentUser);
                console.log("Account deleted successfully.");
                navigate("/account-deleted");
            } catch (error) {
                setError("Failed to delete account. Please try again later.");
            }
        } else {
            setError("Incorrect email");
        }
    }

    return (
        <Page>
            <PageHeader mode={mode}>
                Delete account
            </PageHeader>
            <form className={classNames(
                styles["delete-account__container"],
                styles[mode]
            )}>
                <div className={classNames(
                    styles["delete-account__input-container"],
                    styles[mode]
                )}>
                    <label
                        className={classNames(
                            styles["delete-account__label"],
                            styles[mode]
                        )} htmlFor="email">Write your email</label>
                    <Input name="email"
                        type="text"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)} />
                </div>
                <div className={classNames(
                    styles["delete-account__buttons-container"],
                    styles[mode]
                )}>
                    <Button onClick={() => setCurrentEmail("")}>Cancel</Button>
                    <Button onClick={(e) => handleDeleteAccount(e)}>Submit</Button></div>
                {error && <p
                    className={classNames(
                        styles["delete-account__error-message"],
                        styles[mode]
                    )}>{error}</p>}
            </form>
        </Page>
    );
};
