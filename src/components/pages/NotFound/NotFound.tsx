import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import classnames from "classnames";
import { Page } from "../../structures/Page/Page";
import { Button } from '@radix-ui/themes'
import { useModeContext } from "../../../providers/mode";

const NotFound = () => {
    const { mode } = useModeContext();
    const navigate = useNavigate();

    return (
        <Page>
            <div className="flex items-center justify-center content-center min-h-screen -mt-9">
                <div className="text-center flex">
                    <div>
                        <h1 className={classnames(
                            "text-[14rem] font-bold text-redMedium",
                            styles["animate-fade-in"])}>404</h1>
                        <p className={classnames("mt-4 text-lg", mode === "dark" ? "text-gray-300" : "text-gray-600")}>
                            Oops! The page you are looking for does not exist.
                        </p>
                        <p className={classnames("mt-2", mode === "dark" ? "text-gray-300" : "text-gray-600")}>
                            It might have been moved or deleted. Please check the URL and try again.
                        </p>
                        <Button onClick={() => { navigate("/") }} className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none">
                            Home
                        </Button>
                    </div>
                    <div></div>
                </div>
            </div>
        </Page>
    )
}
export default NotFound;

