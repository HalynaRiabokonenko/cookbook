import React, { ReactElement, useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./AuthForm.module.css";
import classNames from "classnames";

interface Props {
    submitText: string;
    isPasswordHidden?: boolean;
    handleSubmit: (data: { login: string; password: string }) => void;
    children?: React.ReactNode;
}

const AuthForm = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
    children
}: Props): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { mode } = useContext(ModeContext);
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ login, password });
    };

    return (
        <form onSubmit={onSubmit} className={styles["auth__form"]}>
            <label htmlFor="email" className={styles["auth__form-label"]}>Login</label>
            <input
                required
                type="email"
                name="email"
                id="email"
                value={login}
                onChange={(e) => {
                    setLogin(e.target.value);
                }}
                className={classNames(
                    styles["auth__form-input"],
                    styles["auth__form-input--email"],
                    styles[mode]
                )}
            />
            {!isPasswordHidden && (
                <>
                    <label htmlFor="password" className={styles["auth__form-label"]}>Password</label>
                    <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className={classNames(
                            styles["auth__form-input"],
                            styles["auth__form-input--password"],
                            styles[mode]
                        )}
                        minLength={6}
                    />
                </>
            )}
            <button className={classNames(
                styles["auth__form-button"],
                styles[mode]
            )}>{submitText}</button>
            {children}
        </form>
    );
};

export default AuthForm;
