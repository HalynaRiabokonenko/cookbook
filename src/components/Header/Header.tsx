import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import classnames from "classnames";

function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <div className={styles["logo"]}>
          <Link className={styles["logo__link"]} to="/">
            <img
              alt="Logo proven recipes"
              src="/logo.png"
              className={styles["logo__img"]}
            />
          </Link>
        </div>
        <div className={styles["global-nav__container"]}>
          <nav className={styles["global-nav"]}>
            <ul className={styles["global-nav__list"]}>
              <li className={styles["global-nav__list-item"]}>
                <Link
                              className={classnames(
                                styles["global-nav__list-item-link"],
                                styles["global-nav__list-item-link--home"]
                              )}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className={styles["global-nav__list-item"]}>
                <Link
                 className={classnames(
                    styles["global-nav__list-item-link"],
                    styles["global-nav__list-item-link--contact"]
                  )}
                  to="/recipes"
                >
                  Recipes
                </Link>
              </li>
              <li className={styles["global-nav__list-item"]}>
                <Link
                 className={classnames(
                    styles["global-nav__list-item-link"],
                    styles["global-nav__list-item-link--about"]
                  )}
                  to="/about"
                >
                  About us
                </Link>
              </li>
              <li className={styles["global-nav__list-item"]}>
                <Link
                className={classnames(
                    styles["global-nav__list-item-link"],
                    styles["global-nav__list-item-link--contact"]
                  )}
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
