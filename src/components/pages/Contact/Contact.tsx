import React, { useContext } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import Button from "../../share_atomic/Button/Button";

function ContactContent() {
    const { mode } = useContext(ModeContext);

    return (
        <Page>
            <PageHeader mode={mode}>
                Contact us
            </PageHeader>
            <div className={classnames(
                styles["contact-content__modal"],
                styles[mode]
            )}>
                <form
                    action=""
                    method="get"
                    id="contact-content__form"
                    className={styles["contact-content__modal-form"]}
                >
                    <label htmlFor="title" className={styles["contact-content__form-label"]}>
                        Title
                    </label>
                    <input
                        placeholder=""
                        type="text"
                        id="title"
                        name="title"
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--text"],
                            styles[mode]
                        )}
                        minLength={3}
                        required
                    />
                    <label htmlFor="email" className={styles["contact-content__form-label"]}>
                        Email
                    </label>
                    <input
                        placeholder=""
                        type="email"
                        id="email"
                        name="email"
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--email"],
                            styles[mode]
                        )}
                        required
                    />
                    <label htmlFor="message" className={styles["contact-content__form-label"]}>
                        Message
                    </label>
                    <textarea
                        placeholder=""
                        id="message"
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--textarea"],
                            styles[mode]
                        )}
                        name="message"
                        rows={4}
                        cols={50}
                        minLength={3}
                        maxLength={500}
                        required
                    ></textarea>
                    <Button>Send</Button>
                </form>
            </div>
        </Page>
    );
}

export default ContactContent;
