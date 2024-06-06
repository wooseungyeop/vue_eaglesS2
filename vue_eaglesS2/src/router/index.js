import { createRouter, createWebHistory } from "vue-router";
import Suggest from "../components/mainMenu/mainMenuCard/Suggest.vue";
import SetMenu from "../components/mainMenu/mainMenuCard/SetMenu.vue";
import Burger from "../components/mainMenu/mainMenuCard/Burger.vue";
import Side from "../components/mainMenu/mainMenuCard/Side.vue";
import Beverage from "../components/mainMenu/mainMenuCard/Beverage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/suggest" },
    { path: "/suggest", name: "suggest", component: Suggest },
    { path: "/setMenu", name: "setMenu", component: SetMenu },
    { path: "/burger", name: "burger", component: Burger },
    { path: "/side", name: "side", component: Side },
    { path: "/beverage", name: "beverage", component: Beverage },
  ],
});

export default router;
