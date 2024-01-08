import { useState, useEffect } from "react";
import useScreen from "../../hooks/useScreen";
import { BEATFILM_BASE_URL } from "../../utils/constants";

import "./MoviesCard.css";

const MoviesCard = ({ isSavedMoviesPage, movie, onSave, onDelete, saved }) => {
  const screenWidth = useScreen();
  const [isMobile, setIsMobile] = useState(false);
  /* Сохранение фильма */
  const handleSaveCard = () => {
    onSave(movie);
  };

  /* Удаление фильма */
  const handleDeleteCard = () => {
    // console.log(movie)
    onDelete(movie._id);
  };

  /* Определение размера */
  useEffect(() => {
    if (screenWidth < 780) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  /* Перевод минут */
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (hours < 1) {
      return minutes + "м";
    } else {
      return hours + "ч " + minutes + "м";
    }
  }

  return (
    <div className="card">
      <a
        href={movie.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            isSavedMoviesPage
              ? movie.image
              : `${BEATFILM_BASE_URL}${movie.image.url}`
          }
          alt={`Изображение из фильма: ${movie.nameRU}`}
          className="card__image"
        />
      </a>

      <div className="card__description">
        <span className="card__title">{movie.nameRU}</span>
        <span className="card__duration">{getTimeFromMins(movie.duration)}</span>
      </div>
      {saved && !isSavedMoviesPage && 
        <button className="card__button-save" type='button' onClick={!saved ? handleSaveCard : handleDeleteCard} />}
      {isSavedMoviesPage ? (
        <button className="card__button-delete" type='button' onClick={handleDeleteCard} />
      ) : (
        <button className={!saved ? "card__button" : 'card__button_hidden'} type='button'
        onClick={handleSaveCard}>Сохранить</button>
      )}
      {isMobile && isSavedMoviesPage && (
        <button className='card__button_delete card__button_visible' type='button' onClick={handleDeleteCard} />
      )}
      {isMobile && !isSavedMoviesPage && !saved && (
        <button
          className='card__button card__button_visible'
          type='button'
          onClick={handleSaveCard}
        >
          Сохранить
        </button>
      )}
    </div>
  );
};

export default MoviesCard;
