import React, { PropsWithChildren, ReactElement, useContext } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import { ModeContext } from "../../../providers/mode";

export interface ButtonProps {
    onClick?: () => void;
}

const Button = (props: PropsWithChildren<ButtonProps>): ReactElement => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={classNames(
            styles.button,
            styles[mode]
        )}>
            {props.children}
        </div>
    );
}

export default Button;


