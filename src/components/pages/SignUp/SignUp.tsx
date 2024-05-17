import React from "react";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Page } from "../../structures/Page/Page";

const SignUp = () => {
    const navigate = useNavigate()

    interface handleSubmitTypes {
        login: string;
        password: string;
    }

    const handleSubmit = ({ login, password }: handleSubmitTypes) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e)).then(() => navigate("/"))
    };

    return (
        <Page>
            <AuthForm submitText="Register" handleSubmit={handleSubmit} authType="sign-up"></AuthForm>
        </Page>
    )
};

export default SignUp;
