import React from "react";
import { Button } from "@radix-ui/themes";
import { useModeContext } from "../../providers/mode";

export interface ButtonOutlineProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
}

export const ButtonOutline = ({ children, onClick }: ButtonOutlineProps) => {
    const { mode } = useModeContext();

    return (
        <Button
            onClick={onClick}
            variant="solid"
            size="3"
            className={mode === 'dark' ?
                " rounded mt-6 px-4 py-2 rounded-md bg-inherit text-mediumGreen text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen  hover:bg-mediumGreen hover:text-mediumGreenDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :
                " rounded mt-6 px-4 py-2 rounded-md bg-inherit text-mediumGreen  text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen  hover:bg-mediumGreen hover:text-lightGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
        >{children}</Button>
    )
}
