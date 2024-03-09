import { createRouter, createWebHistory } from 'vue-router';
import Todo from './components/Dashboard.vue';
import Hello from './components/hello.vue';

const routes = [
  {
    path: '/',
    component: Todo
  },
  {
    path: '/test',
    component: Hello
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
