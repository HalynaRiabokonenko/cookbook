import React, { useContext } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";

function ContactContent() {
    const { mode } = useContext(ModeContext);

    return (
        <main className={styles["contact-content"]}>
            <section className={classnames(
                styles["contact-content__container"],
                styles[mode]
            )}>
                <PageHeader mode={mode}>
                    Contact us
                </PageHeader>
                <p className={styles["contact-content__paragraph"]}>
                    Dear visitors, your feedback is invaluable to us! If you have tried
                    any of our Ukrainian recipes and would like to share your thoughts, or
                    if you have any other information you'd like to send our way, please
                    feel free to use our contact form. Your input helps us improve and
                    ensures that our recipes continue to delight your taste buds. We
                    appreciate your participation and look forward to hearing from you!
                </p>
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
                        <input
                            type="submit"
                            value="Send"
                            className={classnames(
                                styles["contact-content__form-input"],
                                styles["contact-content__form-input--submit"],
                                styles[mode]
                            )}
                        />
                    </form>
                </div>
            </section>
        </main>
    );
}

export default ContactContent;
