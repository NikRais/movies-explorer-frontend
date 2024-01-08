import React, { useState, useEffect, useCallback } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Main from "../Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import { BEATFILM_BASE_URL } from '../../utils/constants';

import * as mainApi from '../../utils/MainApi';
/*import * as movieApi from '../../utils/MovieApi';*/

import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./App.css";

import {
  //register,
  //login,
  //getUserInfo,
  //editUserInfo,
  //getAllMovies,
  //saveMovie,
  //deleteMovie,
} from "../../utils/MainApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogginOut, setIsLogginOut] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /* Регистрация и авторизация */
  const handleRegistration = async ({ name, email, password }) => {
    try {
      if (!name || !email || !password) {
        return;
      }
      setIsLoading(true);
      const data = await mainApi.register(name, email, password);
      if (data) {
        handleAuthorization(email, password);
      }
    } catch(error) {
      console.log(`Ошибка во время регистрации: ${error}`);
      setPopupMessage('Убедитесь, что регистрируетесь впервые или введите новые данные');
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorization = async (email, password) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    try {
      const data = await mainApi.login(email, password);
      if (data.message) {
        localStorage.setItem('loggedIn', true);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    } catch (error) {
      setPopupMessage('Введите кооректные данные или зарегистрируйтесь');
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* Попап */
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  /* Функциональность карточек фильмов */
  /*
  const handleSearchAllMovies = async (movieSearchQuery) => {
    setIsLoading(true);
    try {
      if (!JSON.parse(localStorage.getItem('allMoviesGallery'))) {
        const allMoviesGallery = await movieApi.getAllMovies();
        localStorage.setItem('allMoviesGallery', JSON.stringify(allMoviesGallery));
      }
      localStorage.setItem('movieSearchQuery', movieSearchQuery);
      const movieQuery = movieSearchQuery.toLowerCase().trim();
      const foundMovies = JSON.parse(localStorage.getItem('allMoviesGallery')).filter((movie) => {
        const movieNameRUToLowerCase = movie.nameRU.toLowerCase().trim();
        const movieNameENToLowerCase = movie.nameEN.toLowerCase().trim();
        return (
          movieNameRUToLowerCase.includes(movieQuery.toLowerCase().trim()) ||
          movieNameENToLowerCase.includes(movieQuery.toLowerCase().trim())
        )
      })
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundMovies = foundMovies.filter((movie) => movie.duration <= SHORT_MOVIE_LENGTH);
        setMovies(filteredFoundMovies);
      } else {
        setMovies(foundMovies);
      }
      setIsSucceeded(true);
    }catch(error) {
      setPopupMessage(error);
      setIsPopupOpen(true);
      setIsSucceeded(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  */



  const handleSaveMovie = async (movie) => {
    try {
      const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
      if (!isSaved) {
        const savedMovie = await mainApi.saveMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${BEATFILM_BASE_URL}${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `${BEATFILM_BASE_URL}${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN
        });
        const savedMoviesList = [...savedMovies, savedMovie];
        setSavedMovies(savedMoviesList);
        localStorage.setItem('savedMovies', JSON.stringify(savedMoviesList));
      }
    } catch (error) {
      setPopupMessage(error);
      setIsPopupOpen(true);
    }

    /*
    const jwt = localStorage.getItem("jwt");
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id;
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(
            item => card._id !== item._id
          );
          localStorage.setItem("savedMovies", updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        });
    }
    */
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await mainApi.deleteMovie(movieId);
      const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
      localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      setSavedMovies(updatedSavedMovies);
    } catch (error) {
      setPopupMessage(error);
      setIsPopupOpen(true);
    }

    /*
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(
          item => card._id !== item._id
        );
        localStorage.setItem("savedMovies", updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
      */
  };

  /* Изменение профиля */
  const handleUpdateUser = async ({name, email}) => {
    setIsLoading(true);
    try {
      const data = await mainApi.editUserInfo({name, email});
      //setIsSucceeded(true);
      setCurrentUser(data);
    } catch(error) {
      console.log(`Ошибка загрузки данных пользователя: ${error}`);
      setPopupMessage("При редактировании профиля произошла ошибка");
      setIsPopupOpen(true);
    } finally {
      setPopupMessage("Профиль отредактирован!");
      setIsPopupOpen(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  /* Выход из профиля */
  const handleSignOut = async () => {
    setIsLogginOut(true);
    try {
      await mainApi.logout();
      localStorage.clear();
      setCurrentUser({});
      setPopupMessage('');
      setFoundMovies([]);
      setSavedMovies([]);
      setMovies([]);
      setIsLoggedIn(false);
      navigate("/", {replace: true});
    } catch (error) {
      console.log(`Ошибка при выходе из системы: ${error}`);
    } finally {
      setIsLogginOut(false);
    }
  };

  useEffect(() => {
    const savedMoviesData = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMoviesData && location.pathname === '/saved-movies') {
      setSavedMovies(savedMoviesData);
    }
  }, [location.pathname]);

  /* Проверка токена */
  const handleTokenCheck = useCallback(async () => {
    try {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (isLoggedIn) {
        await mainApi.handleTokenCheck();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  }, []);

 useEffect(() => {
    handleTokenCheck();
    isLoggedIn &&
    Promise.all([mainApi.getUserInfo(), mainApi.getAllMovies()])
    .then(([userData, savedMoviesData]) => {
      setIsLoggedIn(true);
      setCurrentUser(userData);
      setSavedMovies(savedMoviesData);
      localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
    })
    .catch((error) => {
      console.log(`Ошибка выдачи данных: ${error}`);
    })
  }, [isLoggedIn, handleTokenCheck])

  /*
  const handleTokenCheck = () => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
        navigate(path);
      })
      .catch((err) => console.log(err));
    getAllMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  };
  */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="App">
        <Routes>
          <Route exact path="/signup"
            element={ !isLoggedIn ? (
                <Register onRegister={handleRegistration} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />

          <Route exact path="/signin"
            element={ !isLoggedIn ? (
                <Login onLogin={handleAuthorization} isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />

          <Route exact path="/" element={<Main loggedIn={isLoggedIn}/>} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onLoading={setIsLoading}
                isLoading={isLoading}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                isLoading={isLoading}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
                isLogginOut={isLogginOut}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
