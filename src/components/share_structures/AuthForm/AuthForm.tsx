import React, { ReactElement, useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./AuthForm.module.css";
import classNames from "classnames";

interface Props {
    submitText: string;
    isPasswordHidden?: boolean;
    handleSubmit: (data: { login: string; password: string }) => void;
}

const AuthForm = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
}: Props): ReactElement => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { mode } = useContext(ModeContext);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit({ login, password });
    };

    return (
        <form onSubmit={onSubmit} className={styles["auth__form"]}>
            <div>
                <label htmlFor="email">Login</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={login}
                    onChange={(e) => {
                        setLogin(e.target.value);
                    }}
                />
            </div>
            {!isPasswordHidden && (
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            )}
            <button className={classNames(
                styles["auth__form-button"],
                styles[mode]
            )}>{submitText}</button>
        </form>
    );
};

export default AuthForm;
