import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Menu from "../Menu/Menu";
import "./Navigation.css";

const Navigation = ({ loggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      {loggedIn ? (
        <>
          <div className={location === '/' ? 'navigation__movies navigation__movies_white' : 'navigation__movies'}>
            <Link
              to="/movies"
              className={
                location === "/movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location === "/saved-movies"
                  ? "navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <button className="navigation__button-profile">Аккаунт</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="navigation__auth">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__button">Войти</button>
          </Link>
        </div>
      )}
      {!isMenuOpen && loggedIn ? (
        <button className="navigation__button-menu" onClick={toggleMenu} />
      ) : (
        <Menu onClose={toggleMenu} />
      )}
    </nav>
  );
};

export default Navigation;
