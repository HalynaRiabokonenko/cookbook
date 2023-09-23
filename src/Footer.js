import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className className="footer__brand">
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
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
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
        <p class="footer__copy">
          &copy; {new Date().getFullYear()} Proven Recipes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
