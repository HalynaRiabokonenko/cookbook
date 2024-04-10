import React, { ReactElement, useContext } from "react";
import styles from "./Input.module.css";
import classNames from "classnames";
import { ModeContext } from "../../../providers/mode";
export interface InputProps {
    children?: React.ReactNode;
    type?: "text" | "email" | "password";
}

const Button = ({ children, type = "text" }: InputProps): ReactElement => {
    const { mode } = useContext(ModeContext);

    return (
        <input
            className={classNames(
                styles.input,
                styles[mode]
            )}
            type={type}>
            {children}
        </input>
    );
}

export default Button;


