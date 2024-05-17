import React, { FormEvent, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import styles from "./ResetPassword.module.css";
import { Page } from "../../structures/Page/Page";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import classNames from "classnames";
import { ResetForm } from "../../structures/ResetForm/ResetForm";

export const ResetPassword = () => {
    const { mode } = useModeContext();
    const auth = getAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleClickResetPassword = async ({ email }: { email?: string }) => {
        if (!email) {
            setErrorMessage("Email is required");
            setSuccessMessage(null);
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage("Reset email sent");
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage("Reset email not sent");
            setSuccessMessage(null);
            console.log("Firebase error:", error);
        }
    };

    return (
        <Page>
            <div className={classNames(
                styles["reset-password__content-modal"],
                styles[mode]
            )}>
                <ResetForm handleSubmit={handleClickResetPassword} authType="reset" submitText="Reset" isPasswordHidden successMessage={successMessage} errorMessage={errorMessage}></ResetForm>
            </div>
        </Page>
    )
}