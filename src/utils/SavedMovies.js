import React from "react";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchForm/SearchForm";
import MoviesCardList from "../components/MoviesCardList/MoviesCardList";
import Footer from "../components/Footer/Footer";

import firstMovie from "../images/first-movie.svg";
import secondMovie from "../images/second-movie.svg";
import thirdMovie from "../images/third-movie.svg";

const savedMovies = [
  {
    id: "1",
    name: "33 слова о дизайне",
    image: firstMovie,
    duration: "1ч 17м",
    saved: true,
  },
  {
    id: "2",
    name: "Киноальманах «100 лет дизайна»",
    image: secondMovie,
    duration: "1ч 3м",
    saved: true,
  },
  {
    id: "3",
    name: "В погоне за Бенкси",
    image: thirdMovie,
    duration: "1ч 42м",
    saved: true,
  },
];

const SavedMovies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={true} movies={savedMovies} />
      <Footer />
    </section>
  );
};

export default SavedMovies;
