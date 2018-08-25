<template>
  <div class="hello">
    <label for="rating">Minimum Rating</label>
    <input type="range" id="rating" name="rating"
           v-model="minimumRating"
           min="0" max="10" step="1" />
    <div>{{ minimumRating }}</div>
    <div class="genres clearfix">
      <label v-for="genre in genres" :key="genre.id">
        <input :id="`genre-${genre.name}`"
               :value="genre.id"
               v-model="checkedGenres"
               type="checkbox" />
        {{ genre.name }}
      </label>
    </div>
    <div v-for="movie in filteredMovies" :key="movie.id">
      <h3>{{ movie.original_title }}</h3>
      <img :src="`https://image.tmdb.org/t/p/w500/${ movie.poster_path }`" alt="poster" />
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
  .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }

  .genres label {
    width: 200px;
    float: left;
    text-align: left;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
