import React from "react";
import Header from "../Header/Header";

import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        
        <ul className="promo__nav-bar">
          <li className="promo__item">
            <a href="#aboutProject" className="promo__link">
              О проекте
            </a>
          </li>
          <li className="promo__item">
            <a href="#techs" className="promo__link">
              Технологии
            </a>
          </li>
          <li className="promo__item">
            <a href="#aboutMe" className="promo__link">
              Студент
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Promo;
