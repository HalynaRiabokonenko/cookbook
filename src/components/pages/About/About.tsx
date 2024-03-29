import React, { useContext } from "react";
import styles from "./About.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";

const About = () => {
    const { mode } = useContext(ModeContext);

    return (
        <Page>
            <PageHeader mode={mode}>
                About us
            </PageHeader>
            <div className={styles["about-content"]}>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>Welcome to Proven Recipes, your culinary journey across the globe!</p>
                </div>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>At Proven Recipes, we're enthusiastic about sharing the rich and diverse flavors of cuisines from around the world. Our mission is to bring the authentic tastes of different cultures to your kitchen, one recipe at a time.</p>
                </div>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>Founded with a love for traditional culinary arts, Proven Recipes is a project born out of the deep-rooted culinary traditions of various countries. Our team of dedicated enthusiasts and chefs curates a collection of delicious recipes that reflect the true essence of global gastronomy.</p>
                </div>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>What sets us apart is our commitment to authenticity. Every recipe featured on our website is meticulously researched, tested, and presented with detailed instructions, allowing you to recreate global flavors in your home kitchen. We believe in the power of good food to bring people together, and we strive to create a community where food lovers and culinary enthusiasts can come together to explore the delicious world of international cuisine.</p>
                </div>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>Whether you're a seasoned chef or a kitchen novice, Proven Recipes invites you to embark on this culinary journey with us. Discover the secrets of classics like borscht, pierogi, and other dishes from around the world, and explore regional specialties that showcase the diverse culinary landscape of different countries.</p>
                </div>
                <div className={classnames(
                    styles["about-content__paragraph-container"],
                    styles[mode]
                )}>
                    <p className={classnames(
                        styles["about-content__paragraph"],
                        styles[mode]
                    )}>Thank you for being a part of our community. We invite you to explore our recipes, try your hand at cooking authentic dishes from various countries, and savor the delightful flavors that the world has to offer.</p>
                </div>
            </div>
        </Page>
    );
}

export default About;
