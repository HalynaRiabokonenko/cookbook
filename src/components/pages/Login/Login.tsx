import React from "react";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Page } from "../../structures/Page/Page";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "../../atomic/Toast";

export const Login = () => {
    const navigate = useNavigate();
    interface handleSubmitTypes {
        login: string;
        password: string;
    }

    const handleSubmit = ({ login, password }: handleSubmitTypes) => {
        signInWithEmailAndPassword(auth, login, password)
            .then(() => navigate("/"))
            .catch((error) => {
                toast.error("Incorrect credentials");
                console.error("Error signing in:", error);
            });
    };

    return (
        <Page>
            <AuthForm submitText="Sign in" handleSubmit={handleSubmit} authType="sign-in" />
            <Toast />
        </Page>
    )
};