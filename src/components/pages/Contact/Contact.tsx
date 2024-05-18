import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { Page } from "../../structures/Page/Page";
import { User } from "firebase/auth";
import { db } from "../../../api/firebaseConfig";
import { collection, addDoc, query, where, getDocs, DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from "../../structures/ContactForm/ContactForm";

interface UserProps {
    user: User | null;
}

interface Message {
    id: string;
    title: string;
    message: string;
    timestamp: Timestamp;
}

function ContactContent({ user }: UserProps) {
    const { mode } = useModeContext();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!user || !user.email) return;

        const fetchMessages = async () => {
            try {
                const q = query(
                    collection(db, `contacts/${user.uid}/messages`),
                    where("email", "==", user.email)
                );
                const querySnapshot = await getDocs(q);
                const fetchedMessages = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Message[];
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Error fetching messages: ", error);
                toast.error("Error fetching messages");
            }
        };

        fetchMessages();
    }, [user, user?.email]);

    const handleSubmit = async ({ title = "", message = "" }: { title?: string; message?: string; }) => {
        if (!user) {
            toast.error("User is not authenticated");
            return;
        }

        if (!title.trim()) {
            toast.error("Title cannot be empty");
            return;
        }

        if (!message.trim()) {
            toast.error("Message cannot be empty");
            return;
        }

        const userId = user.uid;

        try {
            await addDoc(collection(db, `contacts/${userId}/messages`), {
                title: title.trim(),
                email: user.email,
                message: message.trim(),
                timestamp: new Date()
            });
            toast.success("Message sent successfully");
        } catch (error) {
            toast.error("Error sending message");
            console.error("Error sending data: ", error);
        }
    };

    return (
        <Page>
            <ContactForm submitText="Send" handleSubmit={handleSubmit}></ContactForm>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                theme={mode === "dark" ? "dark" : "light"}
            />

            <div className={classnames(
                styles["contact-content__messages-container"],
                styles[mode]
            )}>
                {mode === "light" ? (
                    <div className={styles["contact-content__messages-icon-container"]}>
                        <img src="/images/contact/chat-light.png" className={styles["contact-content__messages-icon"]} alt="messages icon" />
                    </div>
                ) : (
                    <div className={styles["contact-content__messages-icon-container"]}>
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
        </Page>
    );
}

export default ContactContent;
