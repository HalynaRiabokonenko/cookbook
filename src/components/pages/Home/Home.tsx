import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";

interface CuisinesInterface {
    id: string;
    description: string;
}

interface AphorismsInterface {
    id: string;
    text: string;
    author: string;
}

const Home = () => {
    const { mode } = useContext(ModeContext);
    const [cuisinesData, setCuisinesData] = useState<CuisinesInterface[]>([]);
    const [aphorismsData, setAphorismsData] = useState<AphorismsInterface[]>([]);
    const [currentAphorismIndex, setCurrentAphorismIndex] = useState(0);
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


    return (
        <Page>
            <PageHeader mode={mode}>
                Delicious World Cuisine
            </PageHeader>
            {aphorismsData.length > 0 && (
                <div className={styles["home-aphorism__content-container"]}>
                    <div className={styles["home-aphorism__container"]}>
                        <p className={styles["home-aphorism__text"]}>{aphorismsData[currentAphorismIndex].text}</p>
                        <p className={styles["home-aphorism__author"]}>- {aphorismsData[currentAphorismIndex].author}</p>
                    </div>
                </div>

            )}
            {/* <p className={styles["home-content__paragraph"]}>
                Welcome to our website, where we have gathered a treasure trove of
                the most renowned recipes from Ukrainian cuisine. Here, you will
                embark on a culinary journey through the heart of Ukraine, exploring
                a diverse array of flavors and traditions that define this rich
                culinary heritage. From hearty borscht and savory pierogies to
                delectable and heavenly holubtsi, our page is a celebration of the
                country's most beloved dishes. Each recipe is carefully curated,
                offering you a chance to recreate the authentic taste of Ukrainian
                home-cooked meals in your own kitchen. Whether you are a seasoned
                chef or a beginner, our collection is designed to inspire and guide
                you through the preparation of these iconic dishes, allowing you to
                savor the essence of Ukrainian culture one bite at a time. Dive in
                and discover the magic of Ukrainian cuisine right here on our
                website.
            </p> */}
            <div className={styles["container-home__list--popular"]}>
                <ul className={styles["home__list--popular"]}>
                    {cuisinesData.map(cousine => (
                        <li key={cousine.id} className={classnames(
                            styles["home-content__recipes-list--option"],
                            styles[mode]
                        )} onClick={() => {
                            navigate(`/recipes/${cousine.id}`)
                        }}>
                            <h2 className={styles["home-content__recipes-name"]}>{cousine.id}</h2>
                            <p className={styles["home-content__recipes-description"]}>{cousine.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Page>
    );
}

export default Home;
