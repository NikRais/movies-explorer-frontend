import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="page__container">
      <div className="page__info">
        <span className="page__status">404</span>
        <span className="page__not-found">Страница не найдена</span>
        <button onClick={() => navigate(-1)} className="page__link">
        Назад
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
