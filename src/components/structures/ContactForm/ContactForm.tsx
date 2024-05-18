import React, { ReactElement, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import { Button } from "@radix-ui/themes";

interface Props {
    submitText: string;
    handleSubmit: ({ title, message }: { title?: string; message?: string; }) => Promise<void>;
}

export const ContactForm = ({
    submitText,
    handleSubmit
}: Props): ReactElement => {
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const { mode } = useModeContext();
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ title, message });
    };

    return (
        <div className="mx-auto w-modal-width">
            <div className={mode === 'dark' ? 'bg-mediumGreenDark text-white rounded-xl mt-10' : 'bg-stone-100 text-gray-900  border border-solid border-1 border-lightGreen rounded-xl mt-10'}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={mode === 'dark' ? '/images/logo/chef.png' : '/images/logo/chef-dark.png'}
                            alt="Proven Recipes logo"
                        />
                        <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight">
                            Contact us
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div >
                                <label htmlFor="title" className="block text-sm font-medium leading-6">Title</label>
                                <div className="mt-2">
                                    <input
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        className={mode === 'dark' ? 'block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                    />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="message" className="block text-sm font-medium leading-6">Message</label>
                                <div className="mt-2">
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                        rows={4}
                                        maxLength={500}
                                        className={mode === 'dark' ? 'resize-none block px-5 w-full bg-black rounded-md border-0 py-1.5 text-lightGreen  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6' : 'resize-none block px-5 w-full rounded-md border-0 py-1.5 text-gray-900  placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6'}
                                    />
                                </div>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


