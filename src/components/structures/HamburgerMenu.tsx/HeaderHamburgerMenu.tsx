import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useModeContext } from '../../../providers/mode';
import { User, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../api/firebaseConfig';
import { toast } from 'react-toastify';
import { Toast } from "../../atomic/Toast/Toast";
interface HeaderHamburgerMenu {
    user: User | null;
}

export const HeaderHamburgerMenu = ({ user }: HeaderHamburgerMenu) => {
    const { mode } = useModeContext();
    const isDarkMode = mode === 'dark';
    const navigate = useNavigate();

    const handlerSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch(error => {
                toast.error("Sign out failed");
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        className={`rounded-full w-[34px] h-[34px] inline-flex items-center justify-center ${isDarkMode ? 'text-white bg-mediumGreenDark' : 'text-mediumGreenDark border-mediumGreenDark bg-white'} border outline-none`}
                        aria-label="Header options"
                    >
                        <HamburgerMenuIcon />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className={`w-screen h-screen ${isDarkMode ? 'bg-black text-headerTextDark' : 'bg-white text-headerText'} rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade`}
                        sideOffset={5}
                    >
                        <DropdownMenu.Item onClick={() => { navigate("/") }} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none mt-5 ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                            Home
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => { navigate("/recipes") }} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                            Recipes
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator className={`text-xl h-[1px] ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} m-[5px]`} />

                        {user && <>
                            <DropdownMenu.Item onClick={() => { navigate("/account") }} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                                Account
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => { navigate("/contact") }} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                                Support
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={handlerSignOut} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                                Sign out
                            </DropdownMenu.Item>
                        </>}

                        {!user && <DropdownMenu.Item onClick={() => { navigate("/login") }} className={`text-xl group rounded-[3px] flex items-center h-[40px] px-[5px] relative pl-[25px] select-none outline-none ${isDarkMode ? 'hover:bg-optionHoverDark' : 'hover:bg-optionHover'}`}>
                            Log in
                        </DropdownMenu.Item>}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <Toast />
        </>
    );
};
