import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface Props {
    mode: string;
}

const Button = (props: PropsWithChildren<Props>): ReactElement => {
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


