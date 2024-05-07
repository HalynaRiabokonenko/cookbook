import React from "react";
import styles from "./About.module.css";
import classnames from "classnames";
import { useModeContext } from "../../../providers/mode";
import PageHeader from "../../share_atomic/PageHeader/PageHeader";
import { Page } from "../../share_structures/Page/Page";

const About = () => {
    const { mode } = useModeContext();

    return (
        <Page>
            <PageHeader mode={mode}>
                About us
            </PageHeader>
            <div className={styles["about-content"]}>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/food-2.avif" className={styles["about-image"]} alt="food and spices" />
                    </div>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Welcome to Proven Recipes</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>Welcome to Proven Recipes, your gateway to a world of culinary delights! We're passionate about sharing the rich and diverse flavors of cuisines from around the globe. Whether you're craving the spicy warmth of Indian curry, the comforting aroma of Italian pasta, or the zesty freshness of Mexican salsa, you'll find an array of tantalizing recipes to explore right here.</p>
                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Our Mission</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>Our mission is simple yet profound: to bring the authentic tastes of different cultures directly to your kitchen. Each recipe we feature has been carefully selected and tested to ensure it captures the essence of its cultural origin. From street food favorites to gourmet classics, we're dedicated to making international cuisine accessible to everyone, one recipe at a time.</p>
                    </div>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/globe-pins.avif" className={styles["about-image"]} alt="globe with pins" />
                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/food-3.avif" className={styles["about-image"]} alt="man hands preparing food" />
                    </div>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Founded with Passion</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>Proven Recipes is more than just a collection of recipes; it's a labor of love crafted by enthusiasts deeply rooted in the culinary traditions of diverse countries. Our journey began with a shared appreciation for the time-honored techniques and flavors passed down through generations. With each recipe, we aim to pay homage to these traditions while also celebrating the innovation and creativity that make global cuisine endlessly fascinating.</p>

                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Commitment to Authenticity</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>What sets us apart is our unwavering commitment to authenticity. Every recipe undergoes meticulous research and testing to ensure it stays true to its cultural heritage. From sourcing the right ingredients to perfecting cooking methods, we leave no stone unturned in our quest to deliver an authentic culinary experience that honors the flavors and traditions of each region.</p>
                    </div>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/spices.avif" className={styles["about-image"]} alt="spices" />
                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/cooking.avif" className={styles["about-image"]} alt="men are cooking together" />
                    </div>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <div className={styles["about-image-container"]}>
                            <img src="" className={styles["about-image"]} alt="" />
                        </div>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Building a Community</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>At Proven Recipes, we believe that food has the power to connect people across borders and cultures. That's why we're dedicated to fostering a vibrant community where food lovers and culinary enthusiasts can come together to share their passion, exchange ideas, and inspire each other's culinary adventures. Whether you're a seasoned chef or a curious beginner, you'll find a warm welcome here.</p>
                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Embark on a Culinary Journey</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>Embark on a culinary journey like no other with Proven Recipes as your guide. Whether you're looking to expand your culinary repertoire or simply seeking inspiration for your next meal, we're here to help you explore the delicious world of international cuisine. So roll up your sleeves, sharpen your knives, and get ready to discover a world of flavors right in your own kitchen.</p>
                    </div>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/journey.avif" className={styles["about-image"]} alt="suitcase with clothes" />
                    </div>
                </div>
                <div className={classnames(
                    styles["about-content__option-container"],
                    styles[mode]
                )}>
                    <div className={styles["about-image-container"]}>
                        <img src="/images/about/enjoy-2.avif" className={styles["about-image"]} alt="family eats food" />
                    </div>
                    <div className={classnames(
                        styles["about-content__text-container"],
                        styles[mode]
                    )}>
                        <h2 className={classnames(
                            styles["about-content__sub-header"],
                            styles[mode]
                        )}>Explore and Enjoy</h2>
                        <p className={classnames(
                            styles["about-content__paragraph"],
                            styles[mode]
                        )}>Thank you for being a part of our community. We invite you to dive into our extensive collection of recipes, roll up your sleeves, and embark on your own culinary adventure. Whether you're cooking for yourself, your family, or your friends, we hope our recipes bring joy and satisfaction to your table. So go ahead, explore, experiment, and above all, enjoy the delicious journey that awaits you!</p>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default About;
