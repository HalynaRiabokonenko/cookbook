import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import { Button, IconButton, Tooltip } from "@radix-ui/themes";
import { EnvelopeClosedIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface Props {
    submitText: string;
    handleSubmit: ({ title, message }: { title?: string; message?: string; }) => Promise<void>;
    isMessageOpen: boolean;
    setIsMessageOpen: Dispatch<SetStateAction<boolean>>;
}

export const ContactForm = ({
    submitText,
    handleSubmit, isMessageOpen, setIsMessageOpen
}: Props): ReactElement => {
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const { mode } = useModeContext();
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleSubmit({ title, message });
    };

    const toggleIsMessageOpen = () => {
        setIsMessageOpen(!isMessageOpen);
    };

    return (
        <div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8">
            <div className={mode === 'dark' ? 'relative bg-mediumGreenDark text-white rounded-xl mt-10' : 'relative bg-stone-100 text-gray-900 border border-solid border-1 border-lightGreen rounded-xl mt-10'}>
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="mx-auto w-full max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={mode === 'dark' ? '/images/logo/chef.png' : '/images/logo/chef-dark.png'}
                            alt="Proven Recipes logo"
                        />
                        <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight">
                            Contact us
                        </h2>
                    </div>

                    <div className="mt-10 mx-auto w-full max-w-sm">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6">Title</label>
                                <div className="mt-2">
                                    <input
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        className={mode === 'dark' ?
                                            'block w-full bg-black rounded-md border-0 py-1.5 px-2 text-lightGreen placeholder-gray-400 outline-none sm:text-sm sm:leading-6'
                                            :
                                            'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 placeholder-gray-400 outline-none sm:text-sm sm:leading-6'
                                        }
                                    />
                                </div>
                            </div>
                            <div>
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
                                        className={mode === 'dark' ?
                                            'resize-none block w-full bg-black rounded-md border-0 py-1.5 px-2 text-lightGreen placeholder-gray-400 outline-none sm:text-sm sm:leading-6'
                                            :
                                            'resize-none block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 placeholder-gray-400 outline-none sm:text-sm sm:leading-6'
                                        }
                                    />
                                </div>
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
                <TooltipProvider>
                    <Tooltip content="Open sended messages" className="bg-gray-900 text-white rounded-md p-2">
                        <IconButton onClick={toggleIsMessageOpen} className={`absolute bottom-1 right-1 p-2 bg-transparent rounded-md ${mode === "dark" ? "hover:bg-optionHoverDark" : "hover:bg-optionHover"}`}>
                            {isMessageOpen ?
                                <EnvelopeOpenIcon width="18" height="18" />
                                :
                                <EnvelopeClosedIcon width="18" height="18" />
                            }
                        </IconButton>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};
