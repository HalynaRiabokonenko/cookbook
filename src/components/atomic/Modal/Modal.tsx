import React from "react";
import { useModeContext } from "../../../providers/mode";

export const Modal = ({ children }: { children: React.ReactNode; }) => {
    const { mode } = useModeContext();

    return (
        <div className={
            `fixed inset-0 bg-black z-50 flex justify-center items-center
            ${mode === "dark" ?
                "bg-opacity-60"
                :
                "bg-opacity-15"
            }`
        }>
            <div id="modal__content--container" className={
                `p-6 min-w-[400px] min-h-[200px] fixed z-40 top-1/2 left-1/2 flex flex-col justify-center items-center rounded-lg  transform -translate-x-1/2 -translate-y-1/2
                 ${mode === "dark" ?
                    "text-headerTextDark bg-mediumGreenDark border-none shadow-none"
                    :
                    "bg-white  border border-gray-200 shadow-2xl"
                }`
            }>
                {children}
            </div>
        </div >
    )
}