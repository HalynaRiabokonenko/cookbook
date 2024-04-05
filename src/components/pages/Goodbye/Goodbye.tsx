import React, { useContext, useState } from "react";
import { ModeContext } from "../../../providers/mode";
import styles from "./Goodbye.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import Button from "../../share_atomic/Button/Button";
import { Page } from "../../share_structures/Page/Page";


export const Goodbye = () => {
    const { mode } = useContext(ModeContext);

    return (
        <Page>
            <PageHeader mode={mode}>
                We will miss you!
            </PageHeader>
        </Page>
    );
};
