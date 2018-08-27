import Vue from 'vue';
import MovieList from '@/components/MovieList';

describe('MovieList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MovieList);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
