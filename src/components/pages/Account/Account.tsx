import React, { useEffect, useState } from "react";
import { useModeContext } from "../../../providers/mode";
import classnames from "classnames";
import styles from "./Account.module.css";
import PageHeader from "../../atomic/PageHeader/PageHeader";
import { Page } from "../../structures/Page/Page";
import { User } from "firebase/auth";
import Button from "../../atomic/Button/Button";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../api/firebaseConfig";
import { ImageUpload } from "../../structures/ImageUpload/ImageUpload";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Modal } from "../../atomic/Modal/Modal";
import { CopyIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip, IconButton } from '@radix-ui/themes';
import { TooltipProvider } from '@radix-ui/react-tooltip';
interface AccountProps {
    user: User | null;
}

interface UserData {
    name: string;
    surname: string;
    username: string;
    male: boolean;
    birthDate: any;
    photo?: string;
}

export const Account = ({ user }: AccountProps) => {
    const { mode } = useModeContext();
    const navigate = useNavigate();
    const [readonly, setReadOnly] = useState<boolean>(true)
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formData, setFormData] = useState<UserData>({
        name: "",
        surname: "",
        username: "",
        male: true,
        birthDate: ""
    });
    const [userPhotoUrl, setUserPhotoUrl] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [errorPhotoChange, setErrorPhotoChange] = useState<string | null>(null);
    const [errorPhotoDelete, setErrorPhotoDelete] = useState<string | null>(null);
    const [isPhotoModal, setIsPhotoModal] = useState(false);
    const [isClickedChangePhoto, setIsClickedChangePhoto] = useState(false);
    const [isClickedDeletePhoto, setIsClickedDeletePhoto] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.info("User ID copied to clipboard");
    };

    const toggleModal = () => {
        setIsPhotoModal(!isPhotoModal);
        document.body.style.overflow = isPhotoModal ? 'auto' : 'hidden';
    };

    let creationTime = "";
    let lastSignInTime = "";

    if (user?.metadata.creationTime && user?.metadata.lastSignInTime) {
        creationTime = new Date(user.metadata.creationTime).toLocaleString();
        lastSignInTime = new Date(user.metadata.lastSignInTime).toLocaleString();
    }

    useEffect(() => {
        if (!user) {
            console.error("User is empty");
            return;
        }

        const fetchUserData = async () => {
            try {
                const docRef = doc(db, `userData/${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data() as UserData);
                    setFormData(docSnap.data() as UserData);
                    setUserPhotoUrl(docSnap.data().photo);
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutsideAccountModal = (event: MouseEvent) => {
            if (event.target && !(event.target as HTMLElement).closest("#modal__content--container") &&
                !(event.target as HTMLElement).closest("#account__user-photo--content")) {
                setIsPhotoModal(false);
                setIsClickedChangePhoto(false);
                setIsClickedDeletePhoto(false);
            }
        };

        document.body.addEventListener("click", handleClickOutsideAccountModal);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideAccountModal);
        };
    }, []);

    const handleSaveData = async (data: UserData) => {
        try {
            await setDoc(doc(db, `userData/${user?.uid}`), data);
            setUserData(data);
            setReadOnly(true)
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveData(formData);
    };

    const handleReset = () => {
        setReadOnly(true);
        if (userData) {
            setFormData(userData);
        } else {
            setFormData(
                {
                    name: "",
                    surname: "",
                    username: "",
                    male: true,
                    birthDate: ""
                }
            )
        }
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
        setErrorPhotoChange(null);
    }

    const handleSubmitPhotoChange = async () => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        const userId = user.uid;

        try {
            let newPhotoUrl: string | null = null;

            if (photo) {
                const photoRef = ref(storage, `photos/${userId}/user_photo`);
                await uploadBytes(photoRef, photo);
                newPhotoUrl = await getDownloadURL(photoRef);
            } else {
                newPhotoUrl = userPhotoUrl;
            }

            await updateDoc(doc(db, `userData/${user?.uid}`), {
                photo: newPhotoUrl
            });
            setUserPhotoUrl(newPhotoUrl);
            setPhoto(null);
            setIsPhotoModal(false);
            setIsClickedChangePhoto(false);
        } catch (error) {
            console.log(error);
            setErrorPhotoChange("Error changing photo");
        }
    };

    const handleSubmitPhotoDelete = async () => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const photoRef = ref(storage, userPhotoUrl);
            await deleteObject(photoRef);
            setPhoto(null);
            setIsPhotoModal(false);
            setUserPhotoUrl("");
            setIsClickedDeletePhoto(false);
            await updateDoc(doc(db, `userData/${user?.uid}`), {
                photo: null
            });
        } catch (error) {
            console.error("Error deleting photo:", error);
            setErrorPhotoDelete("Error deleting photo")
        }
    };

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
                    styles["account__user-photo--container"],
                    styles[mode]
                )}>
                    <div className={classnames(
                        styles["account__user-photo--content"],
                        styles[mode]

                    )}
                        id="account__user-photo--content"
                        onClick={toggleModal}
                    >
                        {
                            userPhotoUrl ?
                                <img src={userPhotoUrl} alt="user photo icon" className={classnames(
                                    styles["account__user-photo"],
                                    styles[mode]
                                )} ></img>
                                :
                                <img src="/images/account/user-image-light.png" alt="user photo icon" className={classnames(
                                    styles["account__user-icon"],
                                    styles[mode])} />
                        }
                    </div>
                </div>

                <div className={classnames(
                    styles["account__user-details"],
                    styles[mode]
                )}>
                    {readonly && <div className={classnames(styles["account__button-container--edit"], styles[mode])}>
                        <button onClick={() => { setReadOnly(false) }} className={classnames(styles["account__button--edit"], styles[mode])}>
                            <TooltipProvider>
                                <Tooltip content="Edit account details" className="bg-gray-900 text-white rounded-md p-2">
                                    <IconButton radius="full" className="ml-2 p-1 bg-transparent hover:bg-gray-100 rounded">
                                        <Pencil1Icon className="w-5 h-5" />
                                    </IconButton>
                                </Tooltip>
                            </TooltipProvider>
                        </button>
                    </div>}
                    {user && <form onSubmit={handleSubmit}>
                        <div className={classnames(
                            styles["account__form--container"],
                            styles[mode]
                        )}>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
                                styles[mode]
                            )}>
                                <label htmlFor="name" className={classnames(
                                    styles["account__form--label"],
                                    styles[mode]
                                )}>
                                    Email:
                                </label>
                                <div className={classnames(
                                    styles["account__form--input-text"],
                                    styles[mode]
                                )}>{user.email}</div>
                            </div>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
                                styles[mode]
                            )}>
                                <label htmlFor="username" className={classnames(
                                    styles["account__form--label"],
                                    styles[mode]
                                )}>
                                    Username:
                                </label>
                                <input type="text" name="username" value={formData.username} onChange={handleChange} readOnly={readonly}
                                    className={readonly ?
                                        classnames(
                                            styles["account__form--input-readonly"],
                                            styles[mode]) :
                                        classnames(
                                            styles["account__form--input"],
                                            styles[mode])
                                    }
                                />
                            </div>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
                                styles[mode]
                            )}>
                                <label htmlFor="name" className={classnames(
                                    styles["account__form--label"],
                                    styles[mode]
                                )}>
                                    Name:
                                </label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={readonly}
                                    className={readonly ?
                                        classnames(
                                            styles["account__form--input-readonly"],
                                            styles[mode]) :
                                        classnames(
                                            styles["account__form--input"],
                                            styles[mode])
                                    }
                                />
                            </div>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
                                styles[mode]
                            )}>
                                <label htmlFor="surname" className={classnames(
                                    styles["account__form--label"],
                                    styles[mode]
                                )}>
                                    Surname:
                                </label>
                                <input type="text" name="surname" value={formData.surname} onChange={handleChange} readOnly={readonly}
                                    className={readonly ?
                                        classnames(
                                            styles["account__form--input-readonly"],
                                            styles[mode]) :
                                        classnames(
                                            styles["account__form--input"],
                                            styles[mode])
                                    }
                                />
                            </div>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
                                styles[mode]
                            )}>
                                <label htmlFor="birthDate" className={classnames(
                                    styles["account__form--label"],
                                    styles[mode]
                                )}>
                                    Birth Date:
                                </label>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} readOnly={readonly}
                                    className={readonly ?
                                        classnames(
                                            styles["account__form--input-readonly"],
                                            styles[mode]) :
                                        classnames(
                                            styles["account__form--input"],
                                            styles[mode])
                                    }
                                />
                            </div>

                            <div className={classnames(styles["account__form--inputs-container"], styles[mode])}>
                                <p className={classnames(styles["account__user-detail-option"], styles[mode])}>User id:</p>
                                <div className="flex items-center">
                                    <p className={classnames(styles["account__user-detail-option-info"], styles[mode])}>{user?.uid}</p>
                                    <button
                                        aria-label="Copy value"
                                        onClick={() => copyToClipboard(user?.uid ?? '')}
                                    >
                                        <TooltipProvider>
                                            <Tooltip content="Copy UID" className="bg-gray-900 text-white rounded-md p-2">
                                                <IconButton radius="full" className="ml-2 p-1 bg-transparent hover:bg-gray-100 rounded">
                                                    <CopyIcon className="w-4 h-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </button>
                                </div>
                            </div>
                            <div className={classnames(
                                styles["account__form--inputs-container"],
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
                                styles["account__form--inputs-container"],
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
                        {!readonly && <div className={styles["account__buttons--container"]}>
                            <Button type="reset" onClick={handleReset}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                        }
                    </form>}
                    {
                        readonly && <div>
                            <Button onClick={() => { navigate("/change-password") }}>Change Password</Button>
                            <Button onClick={() => { navigate("/delete-account") }}>Delete account</Button>
                        </div>
                    }
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                    theme={mode === "dark" ? "dark" : "light"}
                />
            </div>
            {isPhotoModal &&
                <Modal>
                    <div className={classnames(
                        styles["account__user-image--icons-container"],
                        styles[mode]
                    )}>
                        {!isClickedDeletePhoto && <div
                            className={classnames(
                                styles["account__user-image--icon"],
                                styles[mode]
                            )}
                            onClick={() => { setIsClickedChangePhoto(true) }}
                        >
                            <ImageUpload onChange={handlePhotoChange} photo={userPhotoUrl} />
                        </div>}
                        {!isClickedChangePhoto && userPhotoUrl &&
                            <div
                                className={classnames(
                                    styles["account__user-image--icon"],
                                    styles[mode]
                                )}
                                onClick={() => { setIsClickedDeletePhoto(true) }}
                            >
                                <div>Delete image</div>
                            </div>}

                        {isClickedChangePhoto && <Button onClick={handleSubmitPhotoChange}>Save</Button>}
                        {isClickedDeletePhoto && <Button onClick={handleSubmitPhotoDelete}>Confirm</Button>}

                        {errorPhotoChange && <div className={classnames(
                            styles["account__user-icon--error"],
                            styles[mode]
                        )}>{errorPhotoChange}</div>}

                        {errorPhotoDelete && <div className={classnames(
                            styles["account__user-icon--error"],
                            styles[mode]
                        )}>{errorPhotoDelete}</div>}
                    </div>
                </Modal>
            }
        </Page >
    )
}
