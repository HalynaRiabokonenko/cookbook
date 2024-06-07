import React from "react";
import { ToastContainer } from 'react-toastify';
import { useModeContext } from "../../../providers/mode";

export const Toast = () => {
    const { mode } = useModeContext();

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            theme={mode === "dark" ? "dark" : "light"}
        />
    )
}
