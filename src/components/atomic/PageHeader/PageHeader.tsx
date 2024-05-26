import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./PageHeader.module.css";
import classNames from "classnames";
import { useModeContext } from "../../../providers/mode";
interface PageHeader {
    children: string;
}

const PageHeader = ({ children }: PageHeader): ReactElement => {
    const { mode } = useModeContext();

    return (
        <div className={classNames(
            styles["header-container"],
            styles[mode]
        )}>
            <h1 className={classNames(
                styles["header-text"],
                styles[mode]
            )}>
                <span>{children}</span>
            </h1>
        </div>
    );
}

export default PageHeader;


