import React from "react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ButtonSolid } from "../../atomic/Buttons/ButtonSolid";
import { ButtonOutline } from "../../atomic/Buttons/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";

interface ModalAlertLoginProps {
    user: User | null;
    children: React.ReactNode;
}

export const ModalAlertLogin = ({ children, user }: ModalAlertLoginProps) => {
    const { mode } = useModeContext();
    const navigate = useNavigate();

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            {!user && <AlertDialog.Portal>
                <AlertDialog.Overlay className={`bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0
            ${mode === "dark" ?
                        ""
                        :
                        ""
                    }
          `} />
                <AlertDialog.Content className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-2xl focus:outline-none
            ${mode === "dark" ?
                        "text-headerTextDark bg-mediumGreenDark border-none shadow-none"
                        :
                        "bg-white border border-gray-200 shadow-2xl"
                    }
            `}>
                    <AlertDialog.Title className="m-0 text-[17px] font-medium">
                        This function available only for logged users
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-4 text-[15px] leading-normal">
                        Do you want to navigate to login page?
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <ButtonOutline>
                                No
                            </ButtonOutline>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <ButtonSolid onClick={() => { navigate("/login") }}>
                                Yes
                            </ButtonSolid>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>}
        </AlertDialog.Root>
    )
}