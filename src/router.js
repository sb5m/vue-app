import { createRouter, createWebHistory } from 'vue-router';
import Todo from './components/Dashboard.vue';
import Hello from './components/hello.vue';
// import LogComments from './components/LogComments.vue';
import LogMod from './components/LogMod.vue';

const routes = [
  {
    path: '/',
    component: Todo
  },
  {
    path: '/test',
    component: Hello
  },
  {
  path: '/item', 
  component: LogMod,
  props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
