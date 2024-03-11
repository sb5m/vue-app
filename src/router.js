import { createRouter, createWebHistory } from 'vue-router';
import Todo from './components/Dashboard.vue';
import LogMod from './components/LogMod.vue';

const routes = [
  {
    path: '/',
    component: Todo
  },
  {
  path: '/item', 
  component: LogMod,
  props: true
  }
];

const router = createRouter({
  history: createWebHistory("/vue-app/"),
  routes
});

export default router;
