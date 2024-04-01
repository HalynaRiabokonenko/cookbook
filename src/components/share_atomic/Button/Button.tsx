import React, { PropsWithChildren, ReactElement, useContext } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import { ModeContext } from "../../../providers/mode";

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button = ({ onClick, children }: ButtonProps): ReactElement => {
    const { mode } = useContext(ModeContext);

    return (
        <button className={classNames(
            styles.button,
            styles[mode]
        )} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;


