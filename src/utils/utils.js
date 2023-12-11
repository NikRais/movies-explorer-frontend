export const checkSavedCards = (moviesList, movie) => {
  return moviesList.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
};

export function shortMoviesFilter(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

export function moviesFilter(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userQuery.toLowerCase().trim();
    return (
      movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1
    );
  });

  if (shortMoviesCheckbox) {
    return shortMoviesFilter(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}
