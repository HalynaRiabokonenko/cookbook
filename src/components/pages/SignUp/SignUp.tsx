import React from "react";
import { useModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./SignUp.module.css";
import { Page } from "../../structures/Page/Page";

const SignUp = () => {
    const { mode } = useModeContext();
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
            <div className={classnames(
                styles["sign-up__content-modal"],
                styles[mode]
            )}>
                <AuthForm submitText="Register" handleSubmit={handleSubmit} authType="sign-up"></AuthForm>
            </div>
        </Page>
    )
};

export default SignUp;
