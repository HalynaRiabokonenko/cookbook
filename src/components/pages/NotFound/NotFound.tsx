import React from "react";
import { useModeContext } from "../../../providers/mode";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import classnames from "classnames";
import PageHeader from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import { Button } from '@radix-ui/themes'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from '@radix-ui/react-alert-dialog';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Page>
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className={classnames(
                        "text-9xl font-bold text-redMedium",
                        styles["animate-fade-in"])}>404</h1>
                    <p className="mt-4 text-lg text-gray-600">Page Not Found</p>

                    <Button onClick={() => { navigate("/") }} className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none">
                        Go Home
                    </Button>
                </div>
            </div>
        </Page>
    )
}

export default NotFound;

