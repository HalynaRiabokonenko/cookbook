import React from "react";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";

export const AccountModal = () => {
    const { mode } = useModeContext();
    const navigate = useNavigate();

    const handlerSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/login");
            })
            .catch(error => {
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <ul className="m-0  px-9 list-none w-full my-4" >
            <li
                className={classnames("capitalize text-lg rounded-md font-normal h-full w-full flex justify-center items-center cursor-pointer py-2 px-10",
                    {
                        "hover:bg-optionHoverDark":
                            mode === 'dark',
                        "hover:bg-optionHover":
                            mode !== 'dark',
                    }
                )}
                onClick={() => { navigate("/account") }}>
                Account
            </li>
            <li
                className={classnames("capitalize text-lg rounded-md font-normal h-full w-full flex justify-center items-center cursor-pointer py-2 px-9",
                    {
                        "hover:bg-optionHoverDark":
                            mode === 'dark',
                        "hover:bg-optionHover":
                            mode !== 'dark',
                    }
                )}
                onClick={() => { navigate("/contact") }}>
                Support
            </li>
            <li
                className={classnames("capitalize text-lg rounded-md font-normal h-full w-full flex justify-center items-center cursor-pointer py-2 px-9",
                    {
                        "hover:bg-optionHoverDark":
                            mode === 'dark',
                        "hover:bg-optionHover":
                            mode !== 'dark',
                    }
                )}
                onClick={handlerSignOut}>
                Sign out
            </li>
        </ul>
    )
}