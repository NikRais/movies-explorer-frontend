import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Menu.css";

const Menu = ({ onClose }) => {
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
            <NavLink
              to="/"
              className="menu-link"
              activeClassName="menu-link_active"
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className="menu-link"
              activeClassName="menu-link_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="menu-link"
              activeClassName="menu-link_active"
            >
              Сохранённые фильмы
            </NavLink>
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
