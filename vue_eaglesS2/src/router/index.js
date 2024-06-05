import { createRouter, createWebHistory } from 'vue-router';
import Suggest from '../components/mainMenuCard/Suggest.vue';
import SetMenu from '../components/mainMenuCard/SetMenu.vue';
import Burger from '../components/mainMenuCard/Burger.vue';
import Side from '../components/mainMenuCard/Side.vue';
import Beverage from '../components/mainMenuCard/Beverage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/suggest' },
    { path: '/suggest', name: 'suggest', component: Suggest },
    { path: '/setMenu', name: 'setMenu', component: SetMenu },
    { path: '/burger', name: 'burger', component: Burger },
    { path: '/side', name: 'side', component: Side },
    { path: '/beverage', name: 'beverage', component: Beverage }
  ]
});

export default router;