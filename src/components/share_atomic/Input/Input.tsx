import React, { ReactElement, useContext } from "react";
import styles from "./Input.module.css";
import classNames from "classnames";
import { ModeContext } from "../../../providers/mode";
export interface InputProps {
    children?: React.ReactNode;
    type?: "text" | "email" | "password";
    name?: string;
    onChange?: (e: any) => void;
    value?: string;
}

export const Input = ({ children, type = "text", name, value, onChange }: InputProps): ReactElement => {
    const { mode } = useContext(ModeContext);

    return (
        <input
            className={classNames(
                styles.input,
                styles[mode]
            )}
            type={type}
            name={name}
            value={value}
            onChange={onChange}>
            {children}
        </input>
    );
}



