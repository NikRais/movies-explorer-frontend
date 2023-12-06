import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

const SearchForm = () => {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" type="text" placeholder="Фильм" required />
        <button className="search__button"></button>
      </form>

      <FilterCheckbox />

      <div className="search__border" />
    </section>
  );
};

export default SearchForm;
