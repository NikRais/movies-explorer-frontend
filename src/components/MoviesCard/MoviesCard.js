import "./MoviesCard.css";

const MoviesCard = ({ isSavedMoviesPage, movie }) => {
  return (
    <div className="card">
      <img
        src={movie.image}
        alt={`Изображение из фильма: ${movie.name}`}
        className="card__image"
      />
      <div className="card__description">
        <span className="card__title">{movie.name}</span>
        <span className="card__duration">{movie.duration}</span>
      </div>
      {movie.saved && !isSavedMoviesPage && (
        <button className="card__button-save" />
      )}
      {isSavedMoviesPage ? (
        <button className="card__button-delete" />
      ) : (
        <button className="card__button">Сохранить</button>
      )}
    </div>
  );
};

export default MoviesCard;
