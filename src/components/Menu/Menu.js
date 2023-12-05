import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Menu.css";

const Menu = ({ onClose }) => {
  const location = useLocation();

  return (
    <section className="menu">
      <div className="menu__background">
        <div className="menu__container">
          <button
            className="menu__close-button"
            type="button"
            onClick={() => onClose()}
          />
          <div className="menu__main">
            <Link
              to="/"
              className={
                location.pathname === "/" ? "menu-link_active" : "menu-link"
              }
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={
                location.pathname === "/movies" ? "menu-link_active" : "menu-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/saved-movies"
                  ? "menu-link_active"
                  : "menu-link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link to="/profile">
            <button className="menu__button_account">Аккаунт</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
