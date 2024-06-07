import { createRouter, createWebHistory } from "vue-router";

import Index from "../components/mainIndex/MainComponent.vue";
import IndexVideo from "../components/mainIndex/VideoPlayer.vue";
import IndexEnter from "../components/mainIndex/Navigation.vue";
import Mainpage from "../views/Mainpage.vue";
import MainMenu from "../components/mainMenu/MainMenu.vue";
import Suggest from "../components/mainMenu/mainMenuCard/Suggest.vue";
import SetMenu from "../components/mainMenu/mainMenuCard/SetMenu.vue";
import Burger from "../components/mainMenu/mainMenuCard/Burger.vue";
import Side from "../components/mainMenu/mainMenuCard/Side.vue";
import Beverage from "../components/mainMenu/mainMenuCard/Beverage.vue";
import Section from "@/components/mainMenu/Section.vue"
import Mainpayment from "@/components/paymentVIew/Mainpayment.vue";

const routes = [
  {path: "/", redirect: { name: "index" } },
  {path: "/Index", 
   name: "index", 
   component: Index, 
   children: [
    {path: "/IndexVideo", name: "Video", component: IndexVideo},
    {path: "/IndexEnter", name: "Enter", component: IndexEnter}
   ]
  },
  {path:"/mainpage", name: "FirstPage", component : Mainpage},
  {path: "/MainMenu", 
   name: "MainMenu", 
   component: MainMenu, 
   children:[
    {path:"Section", 
     component: Section, 
     children: [
      { path: "/suggest", name: "suggest", component: Suggest },
      { path: "/setMenu", name: "setMenu", component: SetMenu },
      { path: "/burger", name: "burger", component: Burger },
      { path: "/side", name: "side", component: Side },
      { path: "/beverage", name: "beverage", component: Beverage }
     ]
    }
  ]
},
  { path: "/Mainpayment", name: "mainpayment", component:Mainpayment}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
