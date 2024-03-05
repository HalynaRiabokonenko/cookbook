import { ReactElement, useContext, useState } from "react";
import React from "react";
import Button from "../../share_atomic/Button/Button";
import { ModeContext } from "../../../providers/mode";

interface Props {
    submitText: string;
    isPasswordHidden: boolean;
    handleSubmit: () => {};
}

const AuthForm = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
}: Props): ReactElement => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { mode } = useContext(ModeContext);
    const onSubmit = (e) => {
        e.preventDefault();
        return handleSubmit({ login, password });
    };

    return (
        <form onSubmit={onSubmit}>
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
            <Button mode={mode}>{submitText}</Button>
        </form>
    );
};

export default AuthForm;
