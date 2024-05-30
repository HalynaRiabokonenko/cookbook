import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useModeContext } from "../../../providers/mode";
import classnames from "classnames";
import { Page } from "../../structures/Page/Page";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
import { About } from "../../structures/About/About";

interface CuisinesInterface {
    id: string;
    description: string;
    img: string;
}

interface AphorismsInterface {
    id: string;
    text: string;
    author: string;
}

const MOBILE_WIDTH = 900;

const Home = () => {
    const { mode } = useModeContext();
    const [cuisinesData, setCuisinesData] = useState<CuisinesInterface[]>([]);
    const [aphorismsData, setAphorismsData] = useState<AphorismsInterface[]>([]);
    const [currentAphorismIndex, setCurrentAphorismIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribeCuisines = onSnapshot(collection(db, "cuisines"), (snapshot: { docs: DocumentData[] }) => {
            const fetchedCuisines: CuisinesInterface[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCuisinesData(fetchedCuisines);
        });

        const unsubscribeAphorisms = onSnapshot(collection(db, "aphorisms"), (snapshot: { docs: DocumentData[] }) => {
            const fetchedAphorisms: AphorismsInterface[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAphorismsData(fetchedAphorisms);
        });

        return () => {
            unsubscribeCuisines();
            unsubscribeAphorisms();
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentAphorismIndex(prevIndex =>
                prevIndex === aphorismsData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [aphorismsData.length]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_WIDTH);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Page>
            <div className={classnames(
                styles["home__main-container"],
                styles[mode]
            )}>
                {!isMobile && < img className={styles["home__main-image"]} src="/images/pages/main-image-desktop.png"
                />}
                {isMobile && < img className={styles["home__main-image"]} src="/images/pages/main-image.png"
                />}
                <h3 className={classnames(
                    styles["home__main-text-header"],
                    styles["tracking-in-contract"],
                    styles[mode]
                )}>Proven recipes</h3>
                <h3 className={classnames(
                    styles["home__main-text"],
                    styles[mode]
                )}>your culinary journey across the globe</h3>
            </div>
            {aphorismsData.length > 0 && (
                <div className={classnames(
                    styles["home-aphorism__content-container"],
                    styles[mode]
                )}>
                    <div className={styles["home-aphorism__container"]}>
                        <p className={styles["home-aphorism__text"]}>{aphorismsData[currentAphorismIndex].text}</p>
                        <p className={classnames(
                            styles["home-aphorism__author"],
                            styles[mode]
                        )}>- {aphorismsData[currentAphorismIndex].author}</p>
                    </div>
                </div>

            )}
            <About />
            <div className={styles["container-home__list--popular"]}>
                <ul className={styles["home__list--popular"]}>
                    {cuisinesData.map(cousine => (
                        <li key={cousine.id} className={classnames(
                            styles["home-content__recipes-list--option"],
                            styles[mode]
                        )} onClick={() => {
                            navigate(`/recipes/${cousine.id}`)
                        }}>
                            <div className={styles["home-content__recipes-image-container"]}>
                                <img src={cousine.img} className={styles["home-content__recipes-image"]} />
                            </div>
                            <p className={styles["home-content__recipes-description"]}>{cousine.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Page>
    );
}

export default Home;
