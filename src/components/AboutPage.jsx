import React from "react";
import Header from "./Header";
import AboutContent from "./AboutContent";
import Footer from "./Footer";
import "../styles/App.css";

function About() {
  return (
    <div className="about">
      <Header />
      <AboutContent />
      <Footer />
    </div>
  );
}

export default About;
