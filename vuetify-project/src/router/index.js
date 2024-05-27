import { createRouter, createWebHistory } from 'vue-router';
import APP from '../App.vue';
import list from "../components/list.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: APP
    },
    {
      path: '/pokemon',
      name: 'PokemonList',
      component: list,
      props: true
    },
  ]
});

export default router;
