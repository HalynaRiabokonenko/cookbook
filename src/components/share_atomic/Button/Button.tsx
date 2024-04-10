import React, { ReactElement, useContext } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import { ModeContext } from "../../../providers/mode";
export interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, children, type = "submit" }: ButtonProps): ReactElement => {
    const { mode } = useContext(ModeContext);

    return (
        <button
            className={classNames(
                styles.button,
                styles[mode]
            )}
            onClick={onClick}
            type={type}>
            {children}
        </button>
    );
}

export default Button;


