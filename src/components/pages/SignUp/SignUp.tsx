import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./SignUp.module.css";
import { Page } from "../../share_structures/Page/Page";

const SignUp = () => {
    const { mode } = useContext(ModeContext);
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
            <PageHeader mode={mode}>
                Register
            </PageHeader>
            <div className={classnames(
                styles["sign-up__content-modal"],
                styles[mode]
            )}>
                <AuthForm submitText="Register" handleSubmit={handleSubmit} ></AuthForm>
            </div>
        </Page>
    )
};

export default SignUp;
