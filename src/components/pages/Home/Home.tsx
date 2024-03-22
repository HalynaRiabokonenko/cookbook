import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { ModeContext } from "../../../providers/mode";
import classnames from "classnames";
import Button from "../../share_atomic/Button/Button";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { User } from "firebase/auth";
import { Page } from "../../share_structures/Page/Page";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../api/firebaseConfig";
interface HomeProps {
    user: User | null;
}

interface CuisinesInterface {
    id: string;
    description: string
}

const Home = ({ user }: HomeProps) => {
    const { mode } = useContext(ModeContext);
    const [cuisinesData, setCuisinesData] = useState<CuisinesInterface[]>([]);


    useEffect(() => {
        let unsubscribe: () => void;

        const fetchData = async () => {
            try {
                const recipesCollection = collection(db, "cuisines");
                unsubscribe = onSnapshot(recipesCollection, (snapshot: { docs: DocumentData[] }) => {
                    const fetchedRecipes: CuisinesInterface[] = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setCuisinesData(fetchedRecipes);
                });
            } catch (error) {
                console.error("Error fetching cuisines:", error);
            }
        };

        fetchData();

    }, []);

    return (
        <Page>
            <PageHeader mode={mode}>
                Delicious Ukrainian Cuisine
            </PageHeader>
            <p className={styles["home-content__paragraph"]}>
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
            </p>
            <p className={styles["home-content__paragraph"]}>
                “A recipe has no soul. You, as the cook, must bring soul to the
                recipe.” – Thomas Keller
            </p>
            {user && <div className={styles["home-content__all-recipes-link-container"]}>
                <Link to="/recipes" >
                    <Button mode={mode}>
                        All recipes
                    </Button>
                </Link>
            </div>}
            {!user &&
                <div>
                    <p>Login to see all recipes</p>
                    <div className={styles["home-content__all-recipes-link-container"]}>
                        <Link to="/login" >
                            <Button mode={mode}>
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>}
            <div className={styles["container-home__list--popular"]}>
                <ul className={styles["home__list--popular"]}>
                    {cuisinesData.map((cousine) => {
                        return (
                            <li key={cousine.id} className={classnames(
                                styles["home-content__recipes-list--option"],
                                styles[mode]
                            )}>
                                <h2 className={styles["home-content__recipes-name"]}>{cousine.id}</h2>
                                <p className={styles["home-content__recipes-description"]}>{cousine.description}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Page>

    );
}

export default Home;
