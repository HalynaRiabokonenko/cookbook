import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./PageHeader.module.css";
import classNames from "classnames";

export interface Props {
    mode: string;
}

const PageHeader = (props: PropsWithChildren<Props>): ReactElement => {
    return (
        <div className={classNames(
            styles["header-container"],
            styles[props.mode]
        )}>
            <h1 className={classNames(
                styles["header-text"],
                styles[props.mode]
            )}>
                {props.children}
            </h1>
        </div>
    );
}

export default PageHeader;


