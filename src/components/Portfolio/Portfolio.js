import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://github.com/NikRais/how-to-learn"
            target="_blank"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://github.com/NikRais/russian-travel"
            target="_blank"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li>
          <a
            className="portfolio__link"
            rel="noreferrer"
            href="https://github.com/NikRais/react-mesto-api-full-gha"
            target="_blank"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
