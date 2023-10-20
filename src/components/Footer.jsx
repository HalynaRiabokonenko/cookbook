import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer__brand">
          <img
            src="logo.png"
            className="footer__brand-logo"
            alt="Proven Recipes logo"
          />
          <h2 className="footer__brand-name">Proven Recipes</h2>
        </div>
        <div className="footer-links">
          {/* Links to various sections or pages */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us </Link>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          {/* Social media links */}
          <p>Let's be friends!</p>
          <ul>
            <li>
              <a href="https://www.instagram.com/proven.recipes">
                <img
                  className="footer__social-icon"
                  src="instagram-icon.png"
                  alt="Instagram icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Proven Recipes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
