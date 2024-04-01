import React, { useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./ChangePassword.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { auth } from "../../../api/firebaseConfig";
import { Page } from "../../share_structures/Page/Page";
import { User, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import classNames from "classnames";
import Button from "../../share_atomic/Button/Button";

interface ChangePasswordProps {
    user: User | null;
}

export const ChangePassword = ({ user }: ChangePasswordProps) => {
    const { mode } = useContext(ModeContext);
    const email = user?.email;
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const handleChangePassword = async () => {
        if (!email || !currentPassword || !newPassword || !confirmPassword) {
            setError('Please, fill all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords are different');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
            await updatePassword(userCredential.user, newPassword);
            setError(null);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSuccessMessage('Password changed successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 4000);
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };


    return (
        <Page>
            <PageHeader mode={mode}>
                Change password
            </PageHeader>
            <div>
                <div className={classNames(
                    styles["change-password__input-container"],
                    styles[mode]
                )}>
                    <label
                        className={classNames(
                            styles["change-password__label"],
                            styles[mode]
                        )} htmlFor="old-password">Current password:</label>
                    <input
                        className={classNames(
                            styles["change-password__input"],
                            styles[mode]
                        )}
                        name="old-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div
                    className={classNames(
                        styles["change-password__input-container"],
                        styles[mode]
                    )}>
                    <label className={classNames(
                        styles["change-password__label"],
                        styles[mode]
                    )} htmlFor="new-password">New password:</label>
                    <input
                        className={classNames(
                            styles["change-password__input"],
                            styles[mode]
                        )}
                        name="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div
                    className={classNames(
                        styles["change-password__input-container"],
                        styles[mode]
                    )}>
                    <label className={classNames(
                        styles["change-password__label"],
                        styles[mode]
                    )} htmlFor="new-password-repeat">Submit new password:</label>
                    <input
                        className={classNames(
                            styles["change-password__input"],
                            styles[mode]
                        )}
                        name="new-password-repeat"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button onClick={handleChangePassword}>Submit</Button>
                {error && <p
                    className={classNames(
                        styles["change-password__error-message"],
                        styles[mode]
                    )}>{error}</p>}
                {successMessage && <p
                    className={classNames(
                        styles["change-password__success-message"],
                        styles[mode]
                    )}>{successMessage}</p>}
            </div>
        </Page>
    )
}