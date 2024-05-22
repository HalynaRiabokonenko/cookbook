import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { User } from "firebase/auth";

interface Props {
    user: User | null;
}

const Footer: React.FC<Props> = ({ user }: Props) => {
    const { mode } = useModeContext();

    return (
        <footer className={classnames(
            "h-[180px] w-full bg-darkGray text-lightGreen py-5 text-center"
        )}>
            <div className="flex flex-wrap justify-around items-center">
                <div className="text-center">
                    <img src="/images/logo/chef.png" alt="Proven Recipes logo" className="h-20 mx-auto" />
                    <h2 className="text-lighterGreen uppercase mt-2 tracking-widest">Proven Recipes</h2>
                </div>
                <div className="text-left text-lightGreen">
                    <ul className="list-none p-0 columns-2 gap-x-12">
                        <li className="mb-2">
                            <Link to="/" className="text-white hover:text-orange">Home</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/about" className="text-white hover:text-orange">About Us</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/recipes" className="text-white hover:text-orange">Recipes</Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/contact" className="text-white hover:text-orange">Contact Us</Link>
                        </li>
                        {user && <li className="mb-2">
                            <Link to="/account" className="text-white hover:text-orange">Account</Link>
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
                                <img
                                    className="h-6 m-2"
                                    src="/images/social/instagram-icon.png"
                                    alt="Instagram icon"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-xs text-lightGreen">&copy; {new Date().getFullYear()} Proven Recipes. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
