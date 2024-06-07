import { createRouter, createWebHistory } from "vue-router";
import Suggest from "../components/mainMenu/mainMenuCard/Suggest.vue";
import SetMenu from "../components/mainMenu/mainMenuCard/SetMenu.vue";
import Burger from "../components/mainMenu/mainMenuCard/Burger.vue";
import Side from "../components/mainMenu/mainMenuCard/Side.vue";
import Beverage from "../components/mainMenu/mainMenuCard/Beverage.vue";
import PopUp from "../components/mainMenu2/PopUp.vue";
import MainMenu from "../components/mainMenu/MainMenu.vue";
import Mainpage from "../views/Mainpage.vue";
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: "/", redirect: "/suggest" },
//     { path: "/suggest", name: "suggest", component: Suggest },
//     { path: "/setMenu", name: "setMenu", component: SetMenu },
//     { path: "/burger", name: "burger", component: Burger },
//     { path: "/side", name: "side", component: Side },
//     { path: "/beverage", name: "beverage", component: Beverage },
//     { path: "/", name: "popup", component: PopUp },
//     { path: "/", name: "mainmenu", component: MainMenu },
//   ],
// });

const routes = [
  // { path: "/", redirect: "/suggest" },
  { path:"/mainpage",  component : Mainpage}, // seohyun
  { path: "/suggest", name: "suggest", component: Suggest },
  { path: "/setMenu", name: "setMenu", component: SetMenu },
  { path: "/burger", name: "burger", component: Burger },
  { path: "/side", name: "side", component: Side },
  { path: "/beverage", name: "beverage", component: Beverage },
  { path: "/popup", name: "popup", component: PopUp },
  { path: "/mainmenu", name: "mainmenu", component: MainMenu },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
