import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { db } from "../../../api/firebaseConfig";
import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { doc, getDoc } from "firebase/firestore";
import { AccountModal } from "../AccountModal/AccountModal";

interface HeaderProps {
    user: User | null;
}

export const HeaderUserMenu = ({ user }: HeaderProps) => {
    const { mode } = useModeContext();
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            console.error("User is empty");
            return;
        }

        const fetchUserData = async () => {
            try {
                setUserPhotoUrl(null);
                const docRef = doc(db, `userData/${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserPhotoUrl(docSnap.data().photo);
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <NavigationMenu.Root className="relative z-[3] flex justify-end">
            <NavigationMenu.List className="m-0 flex items-center justify-center list-none rounded-[6px] p-1">
                <NavigationMenu.Item >
                    <NavigationMenu.Trigger className="h-headerHeight group flex select-none items-center rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none" >
                        {userPhotoUrl &&
                            <Avatar className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                <AvatarImage
                                    className="w-full h-full object-cover"
                                    src={userPhotoUrl}
                                    alt="User profile picture"
                                />
                            </Avatar>
                        }
                        {!userPhotoUrl &&
                            <div

                                className={classnames("p-0 border-none bg-none cursor-pointer flex justify-center items-center rounded p-2.5 rounded-xl bg-inherit leading-6",
                                    {
                                        "hover:bg-optionHoverDark":
                                            mode === 'dark',
                                        "hover:bg-optionHover":
                                            mode !== 'dark',
                                    }
                                )}
                            >
                                <PersonIcon width="25" height="25" />
                            </div>}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                        className={classnames("absolute z-[3] top-headerHeight right-0 w-full sm:w-auto rounded-md",
                            {
                                "bg-mediumGreenDark":
                                    mode === 'dark',
                                "bg-white shadow-xl":
                                    mode !== 'dark',
                            })
                        }
                    >
                        <AccountModal />
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>

        </NavigationMenu.Root >
    )
}