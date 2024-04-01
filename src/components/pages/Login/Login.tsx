import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import styles from "./Login.module.css";
import { Page } from "../../share_structures/Page/Page";

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

    return (
        <Page>
            <PageHeader mode={mode}>
                Log in
            </PageHeader>
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
        </Page>
    )
};

export default Login;
