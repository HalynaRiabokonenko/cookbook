import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";

const Registration = () => {
    const { mode } = useContext(ModeContext);
    const handleSubmit = ({ login, password }) => {
        console.log(password);
        createUserWithEmailAndPassword(auth, login, password).then((e) =>
            console.log(e)
        );
    };

    return (<div>
        <PageHeader mode={mode}>
            Register
        </PageHeader>
        <AuthForm submitText="Register" handleSubmit={handleSubmit} ></AuthForm>

    </div>)
};

export default Registration;
