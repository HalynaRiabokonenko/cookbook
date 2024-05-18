import React from "react";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Page } from "../../structures/Page/Page";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useModeContext } from "../../../providers/mode";

const SignUp = () => {
    const { mode } = useModeContext();
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
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                theme={mode === "dark" ? "dark" : "light"}
            />
        </Page>
    )
};

export default SignUp;
