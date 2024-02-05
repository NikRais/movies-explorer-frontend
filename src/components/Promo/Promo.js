import React from "react";
import Header from "../Header/Header";

import "./Promo.css";

const Promo = ({ loggedIn }) => {
  return (
    <section className="promo">
      <Header loggedIn={loggedIn} />
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        
        <div className="promo__nav-bar">
            <a href="#aboutProject" className="promo__link">
              О проекте
            </a>
            <a href="#techs" className="promo__link">
              Технологии
            </a>
            <a href="#aboutMe" className="promo__link">
              Студент
            </a>
        </div>
      </div>
    </section>
  );
};

export default Promo;
