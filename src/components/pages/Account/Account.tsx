import React from "react";
import { useModeContext } from "../../../providers/mode";
import classnames from "classnames";
import styles from "./Account.module.css";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { User } from "firebase/auth";
import Button from "../../share_atomic/Button/Button";
import { useNavigate } from "react-router-dom";

interface AccountProps {
    user: User | null;
}

export const Account = ({ user }: AccountProps) => {
    const { mode } = useModeContext();
    const navigate = useNavigate();

    let creationTime = "";
    let lastSignInTime = "";

    if (user?.metadata.creationTime && user?.metadata.lastSignInTime) {
        creationTime = new Date(user.metadata.creationTime).toLocaleString();
        lastSignInTime = new Date(user.metadata.lastSignInTime).toLocaleString();
    }

    return (
        <Page>
            <PageHeader mode={mode}>
                My account
            </PageHeader>
            <div className={classnames(
                styles["account__content"],
                styles[mode]
            )}>
                <div className={classnames(
                    styles["account__user-info-container"],
                    styles[mode]
                )}>
                    Hello, <div className={classnames(
                        styles["account__user-info"],
                        styles[mode]
                    )}>{user?.email}</div>
                </div>
                <div className={classnames(
                    styles["account__user-details"],
                    styles[mode]
                )}>
                    <div className={classnames(
                        styles["account__user-detail-container"],
                        styles[mode]
                    )}>
                        <p className={classnames(
                            styles["account__user-detail-option"],
                            styles[mode]
                        )}>UID:</p>
                        <p className={classnames(
                            styles["account__user-detail-option-info"],
                            styles[mode]
                        )}> {user?.uid}</p>
                    </div>
                    <div className={classnames(
                        styles["account__user-detail-container"],
                        styles[mode]
                    )}>
                        <p className={classnames(
                            styles["account__user-detail-option"],
                            styles[mode]
                        )}>Account created:</p>
                        <p className={classnames(
                            styles["account__user-detail-option-info"],
                            styles[mode]
                        )}> {creationTime}</p>
                    </div>
                    <div className={classnames(
                        styles["account__user-detail-container"],
                        styles[mode]
                    )}>
                        <p className={classnames(
                            styles["account__user-detail-option"],
                            styles[mode]
                        )}>Last login:</p>
                        <p className={classnames(
                            styles["account__user-detail-option-info"],
                            styles[mode]
                        )}> {lastSignInTime}</p>
                    </div>
                </div>
                <Button onClick={() => { navigate("/change-password") }}>Change Password</Button>
                <Button onClick={() => { navigate("/delete-account") }}>Delete account</Button>
            </div>
        </Page>
    )
}
