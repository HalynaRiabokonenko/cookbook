import React, { useState } from "react";
import { useModeContext } from "../../../providers/mode";
import { Button } from "@radix-ui/themes";
interface ResetFormTypes {
    submitText: string;
    handleSubmit: (data: { email?: string; password?: string, passwordConfirm?: string }) => void;
    authType: "reset" | "change";
    isPasswordHidden?: boolean;
    isEmailHidden?: boolean;
    children?: React.ReactNode;
}

export const ResetForm = ({
    submitText,
    authType,
    isPasswordHidden = false,
    isEmailHidden,
    handleSubmit,
}: ResetFormTypes) => {
    const { mode } = useModeContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ email, password, passwordConfirm });
    };

    return (
        <>
            <div className={mode === 'dark' ? 'bg-mediumGreenDark text-white rounded-xl mt-10' : 'bg-stone-100 text-gray-900  border border-solid border-1 border-lightGreen rounded-xl mt-10'}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={mode === 'dark' ? '/images/logo/chef.png' : '/images/logo/chef-dark.png'}
                            alt="Proven Recipes logo"
                        />
                        <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight">
                            {authType === "reset" ? " Reset password" : " Change password"}
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div >
                                {!isEmailHidden &&
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6">Login</label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                value={email}
                                                className={mode === 'dark' ?
                                                    'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'
                                                    :
                                                    'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'
                                                }
                                            />
                                        </div>
                                    </div>
                                }
                                {!isPasswordHidden &&
                                    <div>
                                        <div>
                                            <div className="flex items-center justify-between mt-5">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input

                                                    type="password"
                                                    required
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    minLength={6}
                                                    className={mode === 'dark' ? 'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mt-5">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                                    Confirm password
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input

                                                    type="password"
                                                    required
                                                    id="password"
                                                    value={passwordConfirm}
                                                    onChange={(e) => {
                                                        setPasswordConfirm(e.target.value);
                                                    }}
                                                    minLength={6}
                                                    className={mode === 'dark' ? 'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                }
                            </div>
                            <Button
                                type="submit"
                                className={mode === 'dark' ?
                                    "flex w-full justify-center rounded-md bg-inherit text-mediumGreen px-3 py-1.5 text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen rounded-xl hover:bg-mediumGreen hover:text-mediumGreenDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    :
                                    "flex w-full justify-center rounded-md bg-inherit text-mediumGreen px-3 py-1.5 text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen rounded-xl hover:bg-mediumGreen hover:text-lightGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                }
                            >
                                {submitText}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}