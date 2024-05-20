import React from "react";
import { Button } from "@radix-ui/themes";
import { useModeContext } from "../../providers/mode";

export interface ButtonSolidProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
}

export const ButtonSolid = ({ children, onClick }: ButtonSolidProps) => {
    const { mode } = useModeContext();

    return (
        <Button
            onClick={onClick}
            variant="solid"
            size="3"
            className={mode === 'dark' ?
                "mt-6 px-4 py-2  rounded-md bg-mediumGreen text-mediumGreenDark  text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen  hover:bg-inherit hover:text-mediumGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :
                "mt-6 px-4 py-2  rounded-md bg-mediumGreen text-lightGreen  text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen  hover:bg-inherit hover:text-mediumGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
        >{children}</Button>
    )
}

