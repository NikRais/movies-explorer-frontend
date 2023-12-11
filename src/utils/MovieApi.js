import { BEATFILM_MOVIES_URL } from "./constants";

class MovieApi {
  constructor(movieUrl) {
    this._movieUrl = movieUrl;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
  }

  getMovies() {
    return fetch(this._movieUrl).then((res) => this._parseResponse(res));
  }
}

const movieApi = new MovieApi(BEATFILM_MOVIES_URL);

export default movieApi;
