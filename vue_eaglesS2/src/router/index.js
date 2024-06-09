import { createRouter, createWebHistory } from "vue-router"; // Vue Router를 사용하기 위한 함수를 가져옵니다.
import { navRootStore } from "@/stores/menuStore"; // 네비게이션 관련 상태를 관리하는 스토어를 가져옵니다.

import Index from "../components/mainIndex/MainComponent.vue"; // 메인 컴포넌트를 가져옵니다.
import IndexVideo from "../components/mainIndex/VideoPlayer.vue"; // 비디오 플레이어 컴포넌트를 가져옵니다.
import IndexEnter from "../components/mainIndex/Navigation.vue"; // 네비게이션 컴포넌트를 가져옵니다.
import Mainpage from "../views/Mainpage.vue"; // 메인 페이지 뷰를 가져옵니다.
import MainMenu from "../views/MainMenu.vue"; // 메인 메뉴 뷰를 가져옵니다.
import Suggest from "../components/mainMenu/mainMenuCard/Suggest.vue"; // 추천 메뉴 컴포넌트를 가져옵니다.
import SetMenu from "../components/mainMenu/mainMenuCard/SetMenu.vue"; // 세트 메뉴 컴포넌트를 가져옵니다.
import Burger from "../components/mainMenu/mainMenuCard/Burger.vue"; // 버거 메뉴 컴포넌트를 가져옵니다.
import Side from "../components/mainMenu/mainMenuCard/Side.vue"; // 사이드 메뉴 컴포넌트를 가져옵니다.
import Beverage from "../components/mainMenu/mainMenuCard/Beverage.vue"; // 음료 메뉴 컴포넌트를 가져옵니다.
import Section from "@/components/mainMenu/Section.vue"; // 섹션 컴포넌트를 가져옵니다.
import Mainpayment from "@/views/Mainpayment.vue"; // 결제 페이지 뷰를 가져옵니다.

const routes = [
  // 라우터 설정
  { path: "/", redirect: { name: "index" } }, // 루트 경로에서 index로 리다이렉트
  {
    path: "/Index",
    name: "index",
    component: Index,
    children: [
      // Index 컴포넌트의 자식 라우트
      { path: "/IndexVideo", name: "Video", component: IndexVideo },
      { path: "/IndexEnter", name: "Enter", component: IndexEnter },
    ],
  },
  { path: "/mainpage", name: "FirstPage", component: Mainpage }, // 메인 페이지 라우트
  {
    path: "/MainMenu",
    name: "MainMenu",
    component: MainMenu,
    redirect: { name: "suggest" }, // MainMenu 접근 시 suggest로 리다이렉트
    children: [
      // MainMenu의 자식 라우트
      {
        path: "/Section",
        component: Section,
        children: [
          // Section 컴포넌트의 자식 라우트
          { path: "/suggest", name: "suggest", component: Suggest },
          { path: "/setMenu", name: "setMenu", component: SetMenu },
          { path: "/burger", name: "burger", component: Burger },
          { path: "/side", name: "side", component: Side },
          { path: "/beverage", name: "beverage", component: Beverage },
        ],
      },
    ],
  },
  { path: "/Mainpayment", name: "mainpayment", component: Mainpayment }, // 결제 페이지 라우트
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 브라우저 히스토리 API를 사용한 라우터 생성
  routes, // 라우트 설정
});

router.beforeEach((to, _from, next) => {
  // 라우터 이동 전에 실행할 함수
  const store = navRootStore(); // 네비게이션 스토어 인스턴스를 가져옵니다.
  const options = {
    // 경로에 따른 옵션 매핑
    "/suggest": "suggest",
    "/setMenu": "setMenu",
    "/burger": "burger",
    "/side": "side",
    "/beverage": "beverage",
  };

  const selectedOption = options[to.path]; // 현재 경로에 해당하는 옵션을 가져옵니다.
  if (selectedOption) {
    // 선택된 옵션이 있으면
    store.setSelectedOption(selectedOption); // 스토어의 선택된 옵션을 업데이트합니다.
  }

  next(); // 라우팅을 계속 진행합니다.
});

export default router; // 라우터 인스턴스를 내보냅니다.
