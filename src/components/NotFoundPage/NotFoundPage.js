import React from "react";
import { Link } from "react-router-dom";

import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <section className="page__container">
      <div className="page__info">
        <span className="page__status">404</span>
        <span className="page__not-found">Страница не найдена</span>
      </div>
      <Link to="/" className="page__link">
        Назад
      </Link>
    </section>
  );
};

export default NotFoundPage;
