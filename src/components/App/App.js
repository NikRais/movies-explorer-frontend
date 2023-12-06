import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Main from "../Main";
import Movies from "../../utils/Movies";
import SavedMovies from "../../utils/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <section className="App">
      <Routes>
        <Route path="/" element={<Main loggedIn={isLoggedIn} />} />

        <Route path="/movies" element={<Movies loggedIn={isLoggedIn} />} />

        <Route
          path="/saved-movies"
          element={<SavedMovies loggedIn={isLoggedIn} />}
        />

        <Route path="/profile" element={<Profile loggedIn={isLoggedIn} />} />

        <Route path="/signup" element={<Register />} />

        <Route path="/signin" element={<Login />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </section>
  );
};

export default App;
