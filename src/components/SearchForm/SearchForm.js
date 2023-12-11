import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useForm from "../../hooks/useForm";

import "./SearchForm.css";

const SearchForm = ({
  onSearchMovies,
  onFilter,
  isSavedMoviesPage,
  shortMovies,
  disabled,
}) => {
  const location = useLocation();
  const { enteredValues, handleChange, resetForm, isFormValid } = useForm();

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onSearchMovies(enteredValues.searchRequest, isFormValid, shortMovies);
  }

  function handleSavedMoviesFormSubmit(evt) {
    evt.preventDefault();
    onSearchMovies(enteredValues.searchRequest, shortMovies, resetForm);
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const searchValue = localStorage.getItem("movieSearch");
      enteredValues.searchRequest = searchValue;
    }
  }, [location]);

  return (
    <section className="search">
      {isSavedMoviesPage ? (
        <>
          <form
            className="search__form form"
            name="search-saved-movie-form"
            onSubmit={handleSavedMoviesFormSubmit}
            noValidate
          >
            <input
              className="search__input"
              type="text"
              name="searchRequest"
              placeholder="Фильм"
              required
              value={enteredValues.searchRequest || ""}
              onChange={handleChange}
              disabled={disabled}
            />
            <button
              className="search__button"
              type="submit"
              disabled={disabled}
            ></button>
          </form>

          <FilterCheckbox
            onFilter={onFilter}
            isMovieFilter={shortMovies}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <form
            className="search__form form"
            name="search-movie-form"
            onSubmit={handleFormSubmit}
            noValidate
          >
            <input
              className="search__input"
              type="text"
              name="searchRequest"
              placeholder="Фильм"
              required
              value={enteredValues.searchRequest || ""}
              onChange={handleChange}
              disabled={disabled}
            />
            <button
              className="search__button"
              type="submit"
              disabled={disabled}
            ></button>
          </form>

          <FilterCheckbox
            onFilter={onFilter}
            isMovieFilter={shortMovies}
            disabled={disabled}
          />
        </>
      )}

      <div className="search__border" />
    </section>
  );
};

export default SearchForm;
