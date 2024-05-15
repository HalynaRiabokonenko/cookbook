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
    authType: "sign-in" | "sign-up";
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
        <div className={mode === 'dark' ? 'bg-darkGreen text-white rounded-xl' : 'bg-stone-100 text-gray-900  border border-solid border-1 border-lightGreen rounded-xl'}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={mode === 'dark' ? '/images/logo/chef.png' : '/images/logo/chef-dark.png'}
                        alt="Proven Recipes logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        {authType === "sign-in" ? " Sign in to your account" : " Register account"}

                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-darkGreenDark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have account?{' '}
                    <Link to="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p> */}
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {!isPasswordHidden &&
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6">
                                            Password
                                        </label>
                                        {authType === "sign-in" && <div className="text-sm">
                                            <Link to="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>}
                        </div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-darkGreenDark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {submitText}
                        </Button>
                        {error && <div className={classNames(
                            styles["auth-form__error-message"],
                            styles[mode]
                        )}>{message}</div>}
                        {children}
                    </form>
                    {authType === "sign-in" && <div className="text-sm">
                        <Link to="/sign-up" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Don't have account yet?
                        </Link>
                    </div>}
                    {authType === "sign-up" && <div className="text-sm">
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Already have account?
                        </Link>
                    </div>}
                </div>
            </div>
        </div>


    );
};

export default AuthForm;
