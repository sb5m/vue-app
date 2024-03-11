import { createRouter, createWebHistory } from 'vue-router';
import Todo from './components/Dashboard.vue';
import LogMod from './components/LogMod.vue';

const routes = [
  {
    path: '/',
    component: Todo,
    redirect: { name: 'Home' }
  },
  {
    path: '/vue-app/',
    name: 'Home',
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
