import React, { ReactElement, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import styles from "./AuthForm.module.css";
import classNames from "classnames";
import Button from "../../atomic/Button/Button";

interface Props {
    submitText: string;
    isPasswordHidden?: boolean;
    handleSubmit: (data: { login: string; password: string }) => void;
    children?: React.ReactNode;
    error?: boolean;
    message?: string;
}

const AuthForm = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
    children,
    error,
    message,
}: Props): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { mode } = useModeContext();
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ login, password });
    };

    return (
        <form onSubmit={onSubmit} className={styles["auth__form"]}>
            <div className={styles["auth__form-inputs-container"]}>
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
            </div>
            <Button>{submitText}</Button>
            {error && <div className={classNames(
                styles["auth-form__error-message"],
                styles[mode]
            )}>{message}</div>}
            {children}
        </form>
    );
};

export default AuthForm;