import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import useForm from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";

const Profile = ({ loggedIn, onUpdateUser, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isDataChanged =
    !isFormValid ||
    (currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email);

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>

        <form className="profile___form form" onSubmit={handleSubmit}>
          <div className="profile__form-section">
            <label className="profile__label">Имя</label>
            <input
              className="profile__input"
              type="text"
              name="name"
              value={enteredValues.name || ""}
              required
              onChange={handleChange}
            />
          </div>

          <div className="profile__line"></div>

          <div className="profile__form-section">
            <label className="profile__label">E-mail</label>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={enteredValues.email || ""}
              required
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="profile__bottom-block">
          <button
            className="profile__edit"
            type="submit"
            disabled={isDataChanged}
          >
            Редактировать
          </button>
          <button
            className="profile__logout"
            type="button"
            onClick={() => onSignOut()}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
