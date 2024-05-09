import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import PageHeader from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import Button from "../../atomic/Button/Button";
import { User } from "firebase/auth";
import { db } from "../../../api/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

interface UserProps {
    user: User | null;
}

interface Message {
    id: string;
    title: string;
    message: string;
    timestamp: any;
}

function ContactContent({ user }: UserProps) {
    const { mode } = useModeContext();
    const [message, setMessage] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchMessages = async () => {
            const q = query(
                collection(db, `contacts/${user.uid}/messages`),
                where("email", "==", user.email)
            );
            const querySnapshot = await getDocs(q);
            const fetchedMessages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Message[];
            setMessages(fetchedMessages);
        };

        fetchMessages();
    }, [user]);

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
                message,
                timestamp: new Date()
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
                        minLength={1}
                        maxLength={500}
                        required
                    ></textarea>
                    {message && <div>{message}</div>}
                    <Button>Send</Button>
                </form>
            </div>
            <div className={classnames(
                styles["contact-content__messages-container"],
                styles[mode]
            )}>
                {mode === "light" ? (
                    <div

                        className={styles["contact-content__messages-icon-container"]}
                    >
                        <img src="/images/contact/chat-light.png" className={styles["contact-content__messages-icon"]} alt="messages icon" />
                    </div>
                ) : (
                    <div
                        className={styles["contact-content__messages-icon-container"]}
                    >
                        <img src="/images/contact/chat-dark.png" className={styles["contact-content__messages-icon"]} alt="messages icon" />
                    </div>
                )}

                <div className={styles["contact-content__messages-info-container"]}>
                    {messages.map((msg) => (
                        <div className={classnames(
                            styles["contact-content__message-info"],
                            styles[mode])}
                            key={msg.id}>
                            <div className={styles["contact-content__message-info-option"]}>
                                <p className={classnames(
                                    styles["contact-content__message-info-title"],
                                    styles[mode]
                                )}>Title:</p>
                                <p className={classnames(
                                    styles["contact-content__message-info-details"],
                                    styles[mode]
                                )}>{msg.title}</p>
                            </div>
                            <div className={styles["contact-content__message-info-option"]}>
                                <p className={classnames(
                                    styles["contact-content__message-info-title"],
                                    styles[mode]
                                )}>Message:</p>
                                <p className={classnames(
                                    styles["contact-content__message-info-details"],
                                    styles[mode]
                                )}>{msg.message}</p>
                            </div>
                            <div className={styles["contact-content__message-info-option"]}>
                                <p className={classnames(
                                    styles["contact-content__message-info-title"],
                                    styles[mode]
                                )}>Sent at:</p>
                                <p className={classnames(
                                    styles["contact-content__message-info-details"],
                                    styles[mode]
                                )}>{msg.timestamp.toDate().toString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Page >
    );
}

export default ContactContent;
