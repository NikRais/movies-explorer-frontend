import "./FilterCheckbox.css";

const FilterCheckbox = ({ isMovieFilter, onFilter }) => {
  return (
    <section className="movie-filter">
      <input className="movie-filter__checkbox" type="checkbox" id="checkbox" onChange={onFilter} checked={isMovieFilter} />
      <label className="movie-filter__label" htmlFor="checkbox">
        Короткометражки
      </label>
    </section>
  );
};

export default FilterCheckbox;
