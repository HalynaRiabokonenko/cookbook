import React, { FormEvent, useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./ResetPassword.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import classNames from "classnames";
import Button from "../../share_atomic/Button/Button";

export const ResetPassword = () => {
    const { mode } = useContext(ModeContext);
    const [email, setEmail] = useState("");
    const auth = getAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleClickResetPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            sendPasswordResetEmail(auth, email);
            setSuccessMessage("Reset email sended");
            setEmail("");
        } catch (error) {
            setErrorMessage("Reset email not sended");
            console.log("Firebase error:", error)
        };
    }

    return (
        <Page>
            <PageHeader mode={mode}>
                Reset password
            </PageHeader>
            <form className={classNames(
                styles["reset-password__container"],
                styles[mode]
            )} onSubmit={handleClickResetPassword}>
                <label htmlFor='email' className={classNames(
                    styles["reset-password__label"],
                    styles[mode]
                )}>Your email:</label>
                <div className={classNames(
                    styles["reset-password__input-container"],
                    styles[mode]
                )}>
                    <input className={classNames(
                        styles["reset-password__input"],
                        styles[mode]
                    )} type="email" name="email" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                <Button type="submit">Submit</Button>
                {errorMessage && <p
                    className={classNames(
                        styles["reset-password__error-message"],
                        styles[mode]
                    )}>{errorMessage}</p>}
                {successMessage && <p
                    className={classNames(
                        styles["reset-password__success-message"],
                        styles[mode]
                    )}>{successMessage}</p>}
            </form>
        </Page>
    )
}