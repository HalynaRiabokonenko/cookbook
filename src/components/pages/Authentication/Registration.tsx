import React, { useContext } from "react";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { ModeContext } from "../../../providers/mode";
import { auth } from "../../../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../../share_structures/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate()

    const handleSubmit = ({ login, password }: { login: string, password: string }) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((e) => console.log(e)).then(() => navigate("/"))
    };

    return (<div>
        <PageHeader mode={mode}>
            Register
        </PageHeader>
        <AuthForm submitText="Register" handleSubmit={handleSubmit} ></AuthForm>
    </div>)
};

export default Registration;
