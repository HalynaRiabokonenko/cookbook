import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

interface Props {
    user: User | null;
}

const Footer: React.FC<Props> = ({ user }: Props) => {
    const navigate = useNavigate();

    return (
        <footer className="w-full bg-darkGray text-lightGreen py-5 text-center">
            <div className="flex flex-wrap justify-evenly items-center gap-8 md:gap-16">
                <div className="text-center cursor-pointer" onClick={() => { navigate("/") }}>
                    <img src="/images/logo/chef.png" alt="Proven Recipes logo" className="h-12 mx-auto" />
                    <h2 className="text-lighterGreen uppercase mt-2 tracking-widest">Proven Recipes</h2>
                </div>
                <div className="text-center md:text-left text-lightGreen">
                    <ul className="list-none p-0 space-y-2 md:space-y-0 md:columns-2 md:gap-x-10">
                        <li className="mb-2">
                            <Link to="/" className="text-white hover:text-redLight">Home</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/about" className="text-white hover:text-redLight">About</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/recipes" className="text-white hover:text-redLight">Recipes</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/contact" className="text-white hover:text-redLight">Contact</Link>
                        </li>
                        {user && <li className="mb-2">
                            <Link to="/account" className="text-white hover:text-redLight">Account</Link>
                        </li>}
                    </ul>
                </div>
                <div className="text-center">
                    <p className="text-lightGreen">Let's be friends!</p>
                    <ul className="list-none p-0">
                        <li className="inline-block mr-2">
                            <a
                                href="https://www.instagram.com/proven.recipes"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <InstagramLogoIcon className="h-6 w-6 m-2" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-9">
                <p className="text-xs text-lightGreen">&copy; {new Date().getFullYear()} Proven Recipes. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
