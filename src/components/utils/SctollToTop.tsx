import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (<>
        {children}
    </>);
};
