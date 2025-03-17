import { createRouter, createWebHistory } from 'vue-router';
import Todo from './views/Dashboard.vue';
import LogMod from './views/LogMod.vue';
import Kanban from './views/KanbanBoard.vue';

const routes = [
  {
    path: '/',
    component: Todo
  },
  {
  path: '/item', 
  component: LogMod,
  props: true
  },
  {
    path: '/kanban', 
    component: Kanban,
    props: true
    }
];

const router = createRouter({
  history: createWebHistory("/kanbanvue/"),
  routes
});

export default router;
