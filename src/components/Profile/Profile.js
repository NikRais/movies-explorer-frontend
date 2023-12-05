import React, { useState } from "react";
import Header from "../Header/Header";

import "./Profile.css";

const Profile = ({ loggedIn }) => {
  const [name, setName] = useState("Имя");
  const [email, setEmail] = useState("pochta@yandex.ru");

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, Никита!</h1>

        <form className="profile___form">
          <div className="profile__form-section">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="profile__line"></div>

          <div className="profile__form-section">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </form>

        <div className="profile__bottom-block">
          <button className="profile__edit">Редактировать</button>
          <button className="profile__logout">Выйти из аккаунта</button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
