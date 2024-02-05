import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { moviesFilter, shortMoviesFilter } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";

import "./SavedMovies.css";

const SavedMovies = ({
  loggedIn,
  savedMovies,
  setPopupMessage,
  setIsPopupOpen,
  isLoading,
  onDelete,
}) => {
  const location = useLocation();
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  const [shortMovies, setShortMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSearchSubmit = (inputValue) => {
     if (inputValue.trim().length === 0) {
       setPopupMessage("Нужно ввести ключевое слово");
       setIsPopupOpen(true);
       return;
     }

    const moviesList = moviesFilter(savedMovies, inputValue, shortMovies);
    setSearchQuery(inputValue);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage("Ничего не найдено");
      setIsPopupOpen(true);
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("shortSavedMovies") === "true") {
      setShortMovies(true);
      
      const moviesList = moviesFilter(savedMovies, searchQuery, shortMovies);
      setShowedMovies(shortMoviesFilter(moviesList));
    } else {
      setShortMovies(false);
      const moviesList = moviesFilter(savedMovies, searchQuery, shortMovies);
      setShowedMovies(moviesList);
    }
  }, [savedMovies, location, shortMovies]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMovies]);

  const handleShortFilms = () => {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem("shortSavedMovies", true);
      setShowedMovies(shortMoviesFilter(filteredMovies));
      shortMoviesFilter(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem("shortSavedMovies", false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  };

  return (
    <section className="savedMovies__page">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="savedMovies__container">
          <SearchForm
            shortMovies={shortMovies}
            isSavedMoviesPage={true}
            onSearchMovies={handleSearchSubmit}
            onFilter={handleShortFilms}
          />
          {isLoading && <Preloader />}
          {!isLoading && (
            <MoviesCardList
              isSavedMoviesPage={true}
              savedMovies={savedMovies}
              movies={showedMovies}
              onDelete={onDelete}
            />
          )}
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default SavedMovies;
