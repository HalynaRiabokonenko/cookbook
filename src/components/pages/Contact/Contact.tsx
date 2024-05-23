import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import { Page } from "../../structures/Page/Page";
import { User } from "firebase/auth";
import { db } from "../../../api/firebaseConfig";
import { collection, addDoc, query, where, getDocs, DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from "../../structures/ContactForm/ContactForm";
import { Toast } from "../../atomic/Toast";
import { ContactMessages } from "../../structures/ContactMessages/ContactMessages";
interface UserProps {
    user: User | null;
}
interface MessageType {
    id: string;
    title: string;
    message: string;
    timestamp: Timestamp;
}

function ContactContent({ user }: UserProps) {
    const { mode } = useModeContext();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

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
                })) as MessageType[];
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
            <ContactForm submitText="Send" handleSubmit={handleSubmit} isMessageOpen={isMessageOpen} setIsMessageOpen={setIsMessageOpen}></ContactForm>
            <Toast />
            {isMessageOpen && <div className={classnames(
                styles["contact-content__messages-container"],
                styles[mode]
            )}>
                <div className={styles["contact-content__messages-info-container"]}>
                    {messages.map((msg) => (
                        <div className={classnames(
                            "m-5 py-2.5 px-5 w-full rounded-lg",
                            styles[mode])}
                            key={msg.id}>
                            <ContactMessages messageObj={msg} />
                        </div>
                    ))}
                </div>
            </div>}
        </Page>
    );
}

export default ContactContent;
