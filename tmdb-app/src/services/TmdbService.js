import axios from 'axios';
import apiKey from '../../config/apiKey';

export default {
  getGenres() {
    return new Promise((resolve) => {
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
        .then((response) => {
          console.log(response);
          resolve(response.data.genres);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  },
  getNowPlaying() {
    return new Promise((resolve) => {
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
        .then((response) => {
          resolve(response.data.results);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  },
};
