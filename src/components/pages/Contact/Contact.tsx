import React, { useContext, useState } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import Button from "../../share_atomic/Button/Button";
import { User } from "firebase/auth";
import { db } from "../../../api/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface UserProps {
    user: User | null;
}

function ContactContent({ user }: UserProps) {
    const { mode } = useContext(ModeContext);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const message = formData.get('message') as string;

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        if (!title.trim() || !message.trim()) {
            setMessage("Title and message cannot be empty");
            return;
        }

        const userId = user.uid;

        try {
            await addDoc(collection(db, `contacts/${userId}/messages`), {
                title,
                email: user.email,
                message
            });
            setMessage("Message sent successfully");
        } catch (error) {
            console.error("Error sending data: ", error);
            setMessage("Error sending message");
        }
    };

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
                    onSubmit={handleSubmit}
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
                    {message && <div>{message}</div>}
                    <Button>Send</Button>
                </form>
            </div>
        </Page>
    );
}

export default ContactContent;
