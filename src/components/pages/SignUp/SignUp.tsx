import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./SignUp.module.css";

const SignUp = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate()

    const handleSubmit = ({ login, password }: { login: string, password: string }) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e)).then(() => navigate("/"))
    };

    return (<main className={styles["sign-up__content"]}>
        <section className={classnames(
            styles["sign-up__content-container"],
            styles[mode]
        )}>
            <PageHeader mode={mode}>
                Register
            </PageHeader>
            <div className={classnames(
                styles["sign-up__content-modal"],
                styles[mode]
            )}>
                <AuthForm submitText="Register" handleSubmit={handleSubmit} ></AuthForm>
            </div>
        </section>
    </main>)
};

export default SignUp;
