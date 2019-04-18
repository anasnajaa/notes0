import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/notes/:id',
      name: 'noteDetails',
      component: () => import( './views/NoteDetails.vue')
    },
    {
      path: '/tags/:name',
      name: 'notesByTag',
      component: () => import( './views/NotesByTag.vue')
    },
    {
      path: '/search',
      name: 'notesBySearchText',
      component: () => import( './views/NotesBySearchText.vue')
    }
  ]
})
