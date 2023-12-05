import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../utils/useForm";

import "./Login.css";
import logo from "../../images/header-logo.svg";

const Login = () => {
  const { enteredValues, errors, handleChange } = useForm();

  return (
    <div className="login__container">
      <div className="login__header">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>

        <h1 className="login__title">Рады видеть!</h1>
      </div>

      <form className="login__form">
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="login__input"
          id="email"
          type="email"
          name="email"
          required
          value={enteredValues.email || ""}
          onChange={handleChange}
        />
        <span className="register__error">{errors.email}</span>

        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login__input"
          id="password"
          type="password"
          name="password"
          required
          value={enteredValues.password || ""}
          onChange={handleChange}
        />
        <span className="register__error">{errors.password}</span>

        <button className="login__button" type="submit">
          Войти
        </button>
      </form>

      <div className="login__bottom-block">
        <span>Ещё не зарегистрированы?</span>
        <Link to="signup" className="login__link">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;
