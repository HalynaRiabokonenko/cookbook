import React from "react";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Page } from "../../structures/Page/Page";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "../../atomic/Toast/Toast";

export const SignUp = () => {
    const navigate = useNavigate()
    interface handleSubmitTypes {
        login: string;
        password: string;
    }

    const handleSubmit = ({ login, password }: handleSubmitTypes) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e))
            .then(() => navigate("/"))
            .catch((error) => {
                toast.error("Error signing up");
                console.info("Error signing up:", error);
            });
    };

    return (
        <Page>
            <AuthForm submitText="Register" handleSubmit={handleSubmit} authType="sign-up"></AuthForm>
            <Toast />
        </Page>
    )
};
