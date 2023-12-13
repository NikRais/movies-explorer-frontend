import React, { useState, useEffect } from "react";
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

import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./App.css";

import {
  register,
  login,
  getUserInfo,
  editUserInfo,
  getSavedMovies,
  saveMovie,
  deleteMovie,
} from "../../utils/MainApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn])

  /* Регистрация и авторизация */
  const handleRegistration = async ({ name, email, password }) => {
    return register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return login(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
        Promise.all([getUserInfo(data.token), getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem("savedMovies", JSON.stringify(userMovies));
            setSavedMovies(userMovies);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  /* Попап */
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  /* Функциональность карточек фильмов */
  const handleSaveMovie = (movie) => {
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
  };

  const handleDeleteMovie = (movie) => {
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
  };

  /* Изменение профиля */
  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    editUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage("Профиль отредактирован!");
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage("При редактировании профиля произошла ошибка");
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /* Выход из профиля */
  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    navigate("/");
  };

  /* Проверка токена */
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
    getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  };

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
                <Login onLogin={handleAuthorization} />
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
};

export default App;
