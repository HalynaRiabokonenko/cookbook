import React, { ReactElement } from "react";
import classNames from "classnames";
import { useModeContext } from "../../../providers/mode";

interface PageHeader {
    children: string;
}

const PageHeader = ({ children }: PageHeader): ReactElement => {
    const { mode } = useModeContext();

    return (
        <div className={classNames(
            "text-darkGreen text-center lg:text-5xl md:text-4xl text-3xl uppercase py-20 tracking-wide",
            mode === "dark" ? "text-headerTextDark" : ""
        )}>
            <h1>
                <span className="px-25">{children}</span>
            </h1>
        </div>
    );
}

export default PageHeader;
