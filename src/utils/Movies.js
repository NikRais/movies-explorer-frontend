import React from "react";
import Header from "../components/Header/Header";
import SearchForm from "../components/SearchForm/SearchForm";
import MoviesCardList from "../components/MoviesCardList/MoviesCardList";
import Footer from "../components/Footer/Footer";

import firstMovie from "../images/first-movie.svg";
import secondMovie from "../images/second-movie.svg";
import thirdMovie from "../images/third-movie.svg";
import fourthMovie from "../images/fourth-movie.svg";
import fifthMovie from "../images/fifth-movie.svg";
import sixthMovie from "../images/sixth-movie.svg";

const movies = [
  {
    id: "1",
    name: "33 слова о дизайне",
    image: firstMovie,
    duration: "1ч 17м",
    saved: false,
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
    saved: false,
  },
  {
    id: "4",
    name: "Баския: Взрыв реальности",
    image: fourthMovie,
    duration: "1ч 21м",
    saved: false,
  },
  {
    id: "5",
    name: "Бег это свобода",
    image: fifthMovie,
    duration: "1ч 44м",
    saved: false,
  },
  {
    id: "6",
    name: "Книготорговцы",
    image: sixthMovie,
    duration: "1ч 37м",
    saved: true,
  },
];

const Movies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList isSavedMoviesPage={false} movies={movies} />
      </main>
      <Footer />
    </section>
  );
};

export default Movies;
