<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="btn" class="" v-on:click="getMovies">Get Movies</button>
    <div v-for="genre in genres" :key="genre.id"></div>
    <div v-for="movie in movies" :key="movie.id">
      <h3>{{ movie.original_title }}</h3>
    </div>
  </div>
</template>

<script>
import Tmdb from '../services/TmdbService';

export default {
  name: 'MovieList',
  data() {
    return {
      genres: [],
      movies: [],
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    async getMovies() {
      this.loading = true;
      this.movies = await Tmdb.getNowPlaying();
    },
    async getGenres() {
      this.genres = await Tmdb.getGenres();
    },
  },
  created() {
    this.getGenres();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
