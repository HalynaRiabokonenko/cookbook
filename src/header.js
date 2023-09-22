import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a className="logo__link" href="index.html">
          <img alt="Logo proven recipes" src="logo.png" className="logo__img" />
        </a>
      </div>
      <div className="global-nav__container">
        <nav className="global-nav">
          <ul className="global-nav__list">
            <li className="global-nav__list-item">
              <a
                className="global-nav__list-item-link global-nav__list-item-link--recipes"
                href="recipes.html"
              >
                Recipes
              </a>
            </li>
            <li className="global-nav__list-item">
              <a
                className="global-nav__list-item-link global-nav__list-item-link--about"
                href="about.html"
              >
                About me
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
