import React, { ReactElement, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import styles from "./AuthForm.module.css";
import classNames from "classnames";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
// import Button from "../../atomic/Button/Button";


interface Props {
    submitText: string;
    handleSubmit: (data: { login: string; password: string }) => void;
    authType: "sign-in" | "sign-up" | "reset";
    isPasswordHidden?: boolean;
    children?: React.ReactNode;
    error?: boolean;
    message?: string;
}

const AuthForm = ({
    submitText,
    authType,
    isPasswordHidden = false,
    handleSubmit,
    children,
    error,
    message,
}: Props): ReactElement => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { mode } = useModeContext();
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ login, password });
    };

    return (
        <div className={mode === 'dark' ? 'bg-mediumGreenDark text-white rounded-xl mt-10' : 'bg-stone-100 text-gray-900  border border-solid border-1 border-lightGreen rounded-xl mt-10'}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={mode === 'dark' ? '/images/logo/chef.png' : '/images/logo/chef-dark.png'}
                        alt="Proven Recipes logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight">
                        {authType === "sign-in" ? " Sign in to your account" : " Register account"}

                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div >
                            <label htmlFor="email" className="block text-sm font-medium leading-6">Login</label>
                            <div className="mt-2">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={login}
                                    onChange={(e) => {
                                        setLogin(e.target.value);
                                    }}
                                    className={mode === 'dark' ? 'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                />
                            </div>
                            {!isPasswordHidden &&
                                <div>
                                    <div className="flex items-center justify-between mt-5">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6">
                                            Password
                                        </label>
                                        {authType === "sign-in" && <div className="text-sm">
                                            <Link to="/reset-password" className={mode === 'dark' ?
                                                "font-semibold text-lightGreen hover:text-mediumGreen"
                                                :
                                                "font-semibold text-darkGreen hover:text-mediumGreenDark"}
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            minLength={6}
                                            className={mode === 'dark' ? 'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                        />
                                    </div>
                                </div>}
                        </div>
                        <Button
                            type="submit"
                            className={mode === 'dark' ?
                                "flex w-full justify-center rounded-md bg-inherit text-mediumGreen px-3 py-1.5 text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen rounded-xl hover:bg-mediumGreen hover:text-mediumGreenDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                :
                                "flex w-full justify-center rounded-md bg-inherit text-mediumGreen px-3 py-1.5 text-l font-semibold leading-6 shadow-sm border border-solid border-1.5 border-mediumGreen rounded-xl hover:bg-mediumGreen hover:text-lightGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                        >
                            {submitText}
                        </Button>
                        {error && <div className={classNames(
                            styles["auth-form__error-message"],
                            styles[mode]
                        )}>{message}</div>}
                        {children}
                    </form>
                    {authType === "sign-in" && <div className="text-sm mt-3">
                        <Link to="/sign-up" className={mode === 'dark' ?
                            "font-semibold text-lightGreen hover:text-mediumGreen"
                            :
                            "font-semibold text-darkGreen hover:text-mediumGreenDark"}
                        >
                            Don't have account yet?
                        </Link>
                    </div>}
                    {authType === "sign-up" && <div className="text-sm mt-3">
                        <Link to="/login" className={mode === 'dark' ?
                            "font-semibold text-lightGreen hover:text-mediumGreen"
                            :
                            "font-semibold text-darkGreen hover:text-mediumGreenDark"}>
                            Already have account?
                        </Link>
                    </div>}
                </div>
            </div>
        </div>


    );
};

export default AuthForm;
