import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";

const Login = () => {
    const { mode } = useContext(ModeContext);
    const handleSubmit = ({ login, password }) => {
        console.log(password);
        signInWithEmailAndPassword(auth, login, password).then((e) =>
            console.log(e)
        );
    };

    return (<div>
        <PageHeader mode={mode}>
            Register
        </PageHeader>
        <AuthForm submitText="Log in" handleSubmit={handleSubmit} ></AuthForm>
        <div> {auth?.currentUser?.uid}</div>

    </div>)
};

export default Login;
