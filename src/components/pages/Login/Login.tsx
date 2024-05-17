import React, { useState } from "react";
import { useModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Page } from "../../structures/Page/Page";

const Login = () => {
    const { mode } = useModeContext();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);

    interface handleSubmitTypes {
        login: string;
        password: string;
    }

    const handleSubmit = ({ login, password }: handleSubmitTypes) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e))
            .then(() => navigate("/"))
            .catch((error) => {
                console.error("Error signing in:", error);
                setError(true);
                setErrorMessage("The email or password provided is incorrect");
            });
    };

    return (
        <Page>
            <AuthForm submitText="Sign in" handleSubmit={handleSubmit} error={error} message={errorMessage} authType="sign-in">
            </AuthForm>
        </Page>
    )
};

export default Login;
