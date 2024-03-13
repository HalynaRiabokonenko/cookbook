import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps {
    mode: string;
}

const Button = (props: PropsWithChildren<ButtonProps>): ReactElement => {
    return (
        <div className={classNames(
            styles.button,
            styles[props.mode]
        )}>
            {props.children}
        </div>
    );
}

export default Button;


