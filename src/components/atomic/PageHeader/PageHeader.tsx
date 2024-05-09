import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./PageHeader.module.css";
import classNames from "classnames";

export interface PageHeaderProps {
    mode: string;
}

const PageHeader = (props: PropsWithChildren<PageHeaderProps>): ReactElement => {
    return (
        <div className={classNames(
            styles["header-container"],
            styles[props.mode]
        )}>
            <h1 className={classNames(
                styles["header-text"],
                styles[props.mode]
            )}>
                <span>{props.children}</span>
            </h1>
        </div>
    );
}

export default PageHeader;


