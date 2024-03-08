import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./Login.module.css";

const Login = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate()

    const handleSubmit = ({ login, password }: { login: string, password: string }) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e))
            .then(() => navigate("/"))
    };

    return (<main className={styles["login__content"]}>
        <section className={classnames(
            styles["login__content-container"],
            styles[mode]
        )}>
            <PageHeader mode={mode}>
                Log in
            </PageHeader>
            <div className={classnames(
                styles["login__content-modal"],
                styles[mode]
            )}>
                <AuthForm submitText="Log in" handleSubmit={handleSubmit} ></AuthForm>
            </div>
        </section>

    </main>)
};

export default Login;
