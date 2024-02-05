import { BASE_URL } from "./constants";

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const validateResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка в получении ответа от сервера: ${res.status}`);
};

export const register = ( name, email, password ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    }),
  }).then((res) => validateResponse(res));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => validateResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => validateResponse(res));
};

export const editUserInfo = (formValues) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      name: formValues.name,
      email: formValues.email,
    }),
  }).then((res) => validateResponse(res));
};

export const getAllMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => validateResponse(res));
};

export const saveMovie = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    ),
  }).then((res) => validateResponse(res));
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  }).then((res) => validateResponse(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers,
  }).then((res) => validateResponse(res));
};

export const handleTokenCheck = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => validateResponse(res));
};
