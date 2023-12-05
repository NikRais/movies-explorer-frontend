import myPhoto from '../../images/my-photo.jpg';

import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <span className="about-me__name">Никита</span>
          <span className="about-me__job">Фронтенд-разработчик, 25 лет</span>
          <span className="about-me__biography">
            Я родился и живу в Тюмени, в 2021 году я закончил факультет
            Инноватики ТИУ. Начинал кодить еще в университете, но заниматься
            этим серьезно никак не мог решиться. И вот, только после
            университета и армии я решился встать на этот путь. Люблю играть на
            гитаре и смотреть сериалы с женой.
          </span>
          <a
            className="about-me__link"
            href="https://github.com/NikRais"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Моё фото" />
      </div>
    </div>
  );
};

export default AboutMe;
