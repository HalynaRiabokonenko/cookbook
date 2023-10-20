import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="logo">
          <Link className="logo__link" to="/">
            <img
              alt="Logo proven recipes"
              src="logo.png"
              className="logo__img"
            />
          </Link>
        </div>
        <div className="global-nav__container">
          <nav className="global-nav">
            <ul className="global-nav__list">
              <li className="global-nav__list-item">
                <Link
                  className="global-nav__list-item-link global-nav__list-item-link--contact"
                  to="/contact"
                >
                  Contact us
                </Link>
              </li>
              <li className="global-nav__list-item">
                <Link
                  className="global-nav__list-item-link global-nav__list-item-link--about"
                  to="/about"
                >
                  About us
                </Link>
              </li>
              <li className="global-nav__list-item">
                <Link
                  className="global-nav__list-item-link global-nav__list-item-link--contact"
                  to="/contact"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;