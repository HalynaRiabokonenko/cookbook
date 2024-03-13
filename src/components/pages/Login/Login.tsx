import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./Login.module.css";
import Button from "../../share_atomic/Button/Button";

const Login = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate()

    interface handleSubmitTypes {
        login: string;
        password: string;
    }

    const handleSubmit = ({ login, password }: handleSubmitTypes) => {
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
            <p className={classnames(
                styles["login__content-paragraph"],
                styles[mode]
            )}>Hi there! Welcome to Proven Recipes, so happy to see you!</p>
            <div className={classnames(
                styles["login__content-modal"],
                styles[mode]
            )}>
                <AuthForm submitText="Log in" handleSubmit={handleSubmit} >
                    <p>Don't have account yet?
                    </p>
                    <div className={styles["login_link-container"]}>
                        <Link to="/sign-up" className={classnames(
                            styles["login__navigate-link"],
                            styles[mode]
                        )}>
                            <div>
                                Register
                            </div>
                        </Link>
                    </div>

                </AuthForm>
            </div>
            <div>
            </div>
        </section>

    </main>)
};

export default Login;
