import React from "react";
import { auth } from "../../../api/firebaseConfig";
import { User, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { Page } from "../../structures/Page/Page";
import { useNavigate } from "react-router-dom";
import { ResetForm } from "../../structures/ResetForm/ResetForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "../../atomic/Toast";

interface DeleteAccountProps {
    user: User | null;
}

export const DeleteAccount = ({ user }: DeleteAccountProps) => {
    const navigate = useNavigate();

    const handleDeleteAccount = async ({ password }: { password?: string }) => {
        if (!user || !user.email) {
            toast.error("User not logged in");
            return;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, user.email, password);

            const currentUser = auth.currentUser;
            if (currentUser) {
                await deleteUser(currentUser);
                navigate("/account-deleted");
                toast.success("Account deleted successfully");
            } else {
                toast.error("No authenticated user");
            }
        } catch (error) {
            toast.error("Failed to delete account");
            console.error("Firebase error:", error);
        }
    };

    return (
        <Page>
            <div className="flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <ResetForm
                        handleSubmit={handleDeleteAccount}
                        authType="delete"
                        submitText="Delete account"
                        isEmailHidden
                        isNewEmailHidden
                    />
                    <Toast />
                </div>
            </div>
        </Page>
    );
};
