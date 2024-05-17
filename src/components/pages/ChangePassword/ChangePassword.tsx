import React from "react";
import { useModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { Page } from "../../structures/Page/Page";
import { User, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { ResetForm } from "../../structures/ResetForm/ResetForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface ChangePasswordProps {
    user: User | null;
}

export const ChangePassword = ({ user }: ChangePasswordProps) => {
    const { mode } = useModeContext();

    const handleChangePassword = async ({ password, newPassword, confirmPassword }: { email?: string, password?: string, newPassword?: string, confirmPassword?: string }) => {
        const email = user?.email;
        if (!email || !password || !newPassword || !confirmPassword) {
            toast.error("Please, fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords are different");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await updatePassword(userCredential.user, newPassword);
            toast.success("Password changed successfully");

        } catch (error) {
            toast.error("Password not changed");
            console.log("Firebase error:", error)
        }
    }

    return (
        <Page>
            <ResetForm handleSubmit={handleChangePassword} authType="change" submitText="Change" isEmailHidden />
            <ToastContainer
                position="bottom-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover theme={mode === "dark" ? "dark" : "light"} />
        </Page>
    )
}