import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <section className="movie-filter">
      <input className="movie-filter__checkbox" type="checkbox" id="checkbox" />
      <label className="movie-filter__label" htmlFor="checkbox">
        Короткометражки
      </label>
    </section>
  );
};

export default FilterCheckbox;
