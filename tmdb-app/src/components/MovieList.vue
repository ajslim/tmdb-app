<template>
  <div>
    <h1>The Movie Database: Now playing</h1>
    <div class="row">
      <label for="rating">Minimum Rating</label>
      <div>{{ minimumRating }}
      <input type="range" id="rating" name="rating"
             v-model="minimumRating"
             min="0" max="10" step="1" />
      </div>
    </div>
    <div class="row genres clearfix">
      <label v-for="genre in genres" :key="genre.id">
        <input :id="`genre-${genre.name}`"
               :value="genre.id"
               v-model="checkedGenres"
               type="checkbox" />
        {{ genre.name }}
      </label>
    </div>
    <div class="row" v-for="movie in filteredMovies" :key="movie.id">
      <img class="posterImage two columns" :src="`https://image.tmdb.org/t/p/w500/${ movie.poster_path }`" alt="poster" />
      <div class="ten columns">
        <h5>{{ movie.original_title }}</h5>
        {{ movie.dates }}
      </div>
    </div>
  </div>
</template>

<script>
import Tmdb from '../services/TmdbService';

function intersection(array1, array2) {
  return array1.filter(n => array2.indexOf(n) > -1);
}

export default {
  name: 'MovieList',
  data() {
    return {
      genres: [],
      checkedGenres: [],
      minimumRating: 5,
      allMovies: [],
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    filteredMovies() {
      return this.allMovies
        // Return only movies of the checked genres
        .filter(movie => intersection(
          this.checkedGenres,
          movie.genre_ids).length > 0,
        )
        // Filter by minimum rating
        .filter(movie => movie.vote_average > this.minimumRating)
        // Sort by popularity
        .sort((movieA, movieB) => movieA.popularity - movieB.popularity);
    },
  },
  methods: {
    async getMovies() {
      this.allMovies = await Tmdb.getNowPlaying();
    },
    async getGenres() {
      this.genres = await Tmdb.getGenres();
    },
  },
  created() {
    this.getGenres();
    this.getMovies();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .genres label {
    width: 200px;
    float: left;
    text-align: left;
  }
</style>
