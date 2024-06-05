import { createRouter, createWebHistory } from 'vue-router';
import Suggest from '../components/mainMenu/Suggest.vue';
import SetMenu from '../components/mainMenu/SetMenu.vue';
import Burger from '../components/mainMenu/Burger.vue';
import Side from '../components/mainMenu/Side.vue';
import Beverage from '../components/mainMenu/Beverage.vue';

const routes = [
  { path: '/suggest', component: Suggest },
  { path: '/setMenu', component: SetMenu },
  { path: '/burger', component: Burger },
  { path: '/side', component: Side },
  { path: '/beverage', component: Beverage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;