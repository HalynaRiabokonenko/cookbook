import React from "react";
import { useModeContext } from "../../../providers/mode";
import { Page } from "../../structures/Page/Page";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ResetForm } from "../../structures/ResetForm/ResetForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ResetPassword = () => {
    const { mode } = useModeContext();
    const auth = getAuth();

    const handleClickResetPassword = async ({ email }: { email?: string }) => {
        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset email sent");
        } catch (error) {
            toast.error("Reset email not sent");
            console.log("Firebase error:", error);
        }
    };

    return (
        <Page>
            <ResetForm
                handleSubmit={handleClickResetPassword}
                authType="reset"
                submitText="Reset password"
                isPasswordHidden
            />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                theme={mode === "dark" ? "dark" : "light"}
            />
        </Page>
    );
};
