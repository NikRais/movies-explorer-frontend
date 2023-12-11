import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useScreen from "../../hooks/useScreen";
import { checkSavedCards } from "../../utils/utils";
import {
  BIG_SCREEN_MOVIES,
  MIDDLE_SCREEN_MOVIES,
  SMALL_SCREEN_MOVIES,
  ADD_MOVIES_BIG_SCREEN,
  ADD_MOVIES_SMALL_SCREEN,
  BIG_SCREEN,
  SMALL_SCREEN,
} from "../../utils/constants";

import "./MoviesCardList.css";

const MoviesCardList = ({
  isSavedMoviesPage,
  movies,
  savedMovies,
  onSave,
  onDelete,
}) => {
  const [showMovieList, setShowMovieList] = useState(movies);

  const screenWidth = useScreen();

  const searchedMoviesCount = movies ? movies.length : 0;

  const handleAddMoreClick = () => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(
        movies.slice(0, showMovieList.length + ADD_MOVIES_BIG_SCREEN)
      );
    } else {
      setShowMovieList(
        movies.slice(0, showMovieList.length + ADD_MOVIES_SMALL_SCREEN)
      );
    }
  };

  useEffect(() => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(movies.slice(0, BIG_SCREEN_MOVIES));
    } else if (screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) {
      setShowMovieList(movies.slice(0, MIDDLE_SCREEN_MOVIES));
    } else if (screenWidth <= SMALL_SCREEN) {
      setShowMovieList(movies.slice(0, SMALL_SCREEN_MOVIES));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, movies]);

  return (
    <section className="cards">
      <div className="cards__list">
        {showMovieList.sort().map((movie) => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            saved={checkSavedCards(savedMovies, movie)}
          />
        })}
      </div>
      {!isSavedMoviesPage &&
        showMovieList &&
        searchedMoviesCount !== showMovieList.length && (
          <button
            className="cards__button"
            onClick={handleAddMoreClick}
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
