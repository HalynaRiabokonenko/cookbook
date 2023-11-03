import React from "react";
import "../styles/About.css";

function AboutContent() {
  return (
    <main className="about-content">
      <section className="about-content__container">
        <h1 className="about-content__header">About us</h1>
        <p className="about-content__paragraph about-content__paragraph--italic">
          Welcome to PROVEN RECIPES – Your Culinary Journey to Ukraine!
        </p>
        <p className="about-content__paragraph">
          At PROVEN RECIPES, we are passionate about sharing the rich and
          diverse flavors of Ukrainian cuisine with the world. Our mission is to
          bring the authentic taste of Ukraine to your kitchen, one recipe at a
          time.
        </p>
        <h2 className="about-content__subheader">Our Story</h2>
        <p className="about-content__paragraph">
          Founded with a love for traditional Ukrainian cooking, PROVEN RECIPES
          is a labor of love that stems from the deep-rooted culinary traditions
          of Ukraine. Our team of dedicated food enthusiasts and chefs curate a
          collection of mouthwatering recipes that reflect the true essence of
          Ukrainian gastronomy.
        </p>
        <h2 className="about-content__subheader">What Sets Us Apart</h2>
        <p className="about-content__paragraph">
          What sets us apart is our commitment to authenticity. Each recipe
          featured on our website is carefully researched, tested, and presented
          with detailed instructions, ensuring that you can recreate the flavors
          of Ukraine in your home kitchen. We believe in the power of good food
          to connect people, and we strive to create a community where food
          lovers and cooking enthusiasts can come together to explore the
          delicious world of Ukrainian cuisine.
        </p>
        <h2 className="about-content__subheader">
          Join Us on This Culinary Adventure
        </h2>
        <p className="about-content__paragraph">
          Whether you are a seasoned chef or a novice in the kitchen, PROVEN
          RECIPES welcomes you to embark on this culinary adventure with us.
          Discover the secrets of borscht, pierogi, and other Ukrainian
          classics, and explore regional specialties that showcase the diverse
          culinary landscape of Ukraine.
        </p>
        <p className="about-content__paragraph">
          Thank you for being a part of our community. We invite you to explore
          our recipes, try your hand at cooking authentic Ukrainian dishes, and
          savor the delightful flavors that Ukraine has to offer.
        </p>
        <p className="about-content__paragraph about-content__paragraph--italic">
          Дякуємо (Thank you) for visiting PROVEN RECIPES!
        </p>
      </section>
    </main>
  );
}

export default AboutContent;
