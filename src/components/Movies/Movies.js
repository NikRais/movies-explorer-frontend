import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import { moviesFilter, shortMoviesFilter } from "../../utils/utils";
import movieApi from "../../utils/MovieApi";

import "./Movies.css";

const Movies = ({
  loggedIn,
  onLoading,
  savedMovies,
  onSave,
  isLoading,
  setPopupMessage,
  setIsPopupOpen,
}) => {
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const location = useLocation();

  const handleSetFilteredMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = moviesFilter(movies, userQuery, false);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage("Ничего не найдено");
      setIsPopupOpen(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? shortMoviesFilter(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  };

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim().length === 0) {
      setPopupMessage("Нужно ввести ключевое слово");
      setIsPopupOpen(true);
      return;
    }

    localStorage.setItem("movieSearch", inputValue);
    localStorage.setItem("shortMovies", shortMovies);

    if (isAllMovies.length === 0) {
      onLoading(true);
      movieApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          setIsAllMovies(movies);
          handleSetFilteredMovies(movies, inputValue, shortMovies);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => onLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  };

  const handleShortFilms = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(shortMoviesFilter(initialMovies));
      if (moviesFilter.length === 0) {
        setNotFound(true);
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !shortMovies);
  };

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(shortMoviesFilter(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [location]);

  return (
    <section className="movies__page">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="movies__content">
          <SearchForm
            onFilter={handleShortFilms}
            onSearchMovies={handleSearchSubmit}
            shortMovies={shortMovies}
          />
          {isLoading && <Preloader />}
          {!isLoading && (
            <MoviesCardList
              isSavedMoviesPage={false}
              movies={filteredMovies}
              savedMovies={savedMovies}
              onSave={onSave}
            />
          )}
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Movies;
