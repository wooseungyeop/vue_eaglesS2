<script setup>
import { watch } from "vue"; // Vue의 반응성 시스템을 사용하기 위한 watch 함수를 가져옵니다.
import { useRoute, useRouter } from "vue-router"; // 라우터 기능을 사용하기 위해 필요한 훅을 가져옵니다.
import { useMenuStore, navRootStore, useOrderStore } from "@/stores/menuStore"; // 상태 관리를 위한 스토어 훅을 가져옵니다.
import swal from "sweetalert2"; // 알림창을 위한 sweetalert2 라이브러리를 가져옵니다.

const route = useRoute(); // 현재 라우트 정보를 가져옵니다.
const router = useRouter(); // 라우터 인스턴스를 가져옵니다.
const itemstore = useMenuStore(); // 메뉴 관련 상태를 관리하는 스토어를 가져옵니다.
const store = navRootStore(); // 네비게이션 관련 상태를 관리하는 스토어를 가져옵니다.
const orderStore = useOrderStore(); // 주문 관련 상태를 관리하는 스토어를 가져옵니다.

const updateSelectedOption = (newPath) => {
  // 라우트 경로가 변경될 때 호출되는 함수입니다.
  console.log("New Path:", newPath); // 변경된 경로를 콘솔에 출력합니다.
  const options = {
    // 라우트 경로와 매칭되는 옵션을 정의합니다.
    "/suggest": "suggest",
    "/setMenu": "setMenu",
    "/burger": "burger",
    "/side": "side",
    "/beverage": "beverage",
  };

  const matchedOption = Object.keys(options).find((path) => newPath === path); // 변경된 경로에 해당하는 옵션을 찾습니다.
  console.log("Matched Option:", matchedOption); // 찾은 옵션을 콘솔에 출력합니다.
  if (matchedOption && store.selectedOption !== options[matchedOption]) {
    // 찾은 옵션이 현재 선택된 옵션과 다르면 업데이트합니다.
    store.setSelectedOption(options[matchedOption]);
  }
};

// 모달창 기능구현
const showAlert = () => {
  // 미구현 페이지에 대한 알림창을 보여주는 함수입니다.
  swal.fire({
    title: "Error!",
    text: "미구현페이지입니다!",
    icon: "error",
    confirmButtonColor: "#ea0029",
    confirmButtonText: "확인",
  });
};

const foodInfo = () => {
  // 영양 정보를 보여주는 모달창을 구현하는 함수입니다.
  swal.fire({
    title: "영양 정보",
    html: `
      <img src="https://www.kfckorea.com/nas/kfcimg/info/info_nutrition.png" alt="영양 정보 이미지" style="width:100%; height:99%;">
    `,
    confirmButtonText: "확인",
    confirmButtonColor: "#ea0029",
    customClass: {
      popup: "swal-modal-foodinfo", // 모달창에 적용할 CSS 클래스를 정의합니다.
    },
  });
};

const confirmAction = () => {
  // 주문 취소 확인 모달창을 보여주는 함수입니다.
  swal
    .fire({
      title: "시작화면으로",
      text: "주문을 취소하고 이동하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea0029",
      cancelButtonColor: "#0f1822",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 사용자가 승인을 선택하면 주문을 취소하고 메인 페이지로 이동합니다.
        swal
          .fire({
            title: "시작화면으로",
            text: "주문을 취소하고 이동합니다",
            icon: "success",
            confirmButtonColor: "#ea0029",
            confirmButtonText: "확인",
          })
          .then(() => {
            itemstore.clearSelectedItems(); // 선택된 항목을 초기화합니다.
            router.push("/mainpage"); // 메인 페이지로 라우팅합니다.
          });
      }
    });
};

// `watch`는 Vue의 반응성 시스템을 사용하여 `route.path`의 변경을 감시합니다.
// `route.path`가 변경될 때마다 `updateSelectedOption` 함수를 호출하여
// 스토어의 `selectedOption`을 적절히 업데이트합니다.
watch(
  () => route.path,
  (newPath) => {
    updateSelectedOption(newPath);
  },
  { immediate: true } // 경로가 설정될 때 즉시 실행되도록 설정
);
</script>

<template>
  <div class="HD">
    <div class="Hd_Top">
      <div class="Hd_Top_Front">
        <div
          class="Front_Eat"
          :class="{ activeOption: orderStore.orderOption === 'eat' }"
          @click="() => orderStore.setOrderOption('eat')"
        >
          매장식사
        </div>
        <div
          class="Front_Packaging"
          :class="{ activeOption: orderStore.orderOption === 'packaging' }"
          @click="() => orderStore.setOrderOption('packaging')"
        >
          포장주문
        </div>
      </div>
      <div class="Hd_Top_Back">
        <div @click="confirmAction">첫화면</div>
        <div @click="showAlert">사용안내</div>
        <div @click="foodInfo">영양정보</div>
        <div @click="showAlert">Language</div>
      </div>
    </div>
    <div class="Hd_Nav">
      <router-link :to="{ path: '/suggest' }">추천메뉴</router-link>
      <router-link :to="{ path: '/setMenu' }">세트메뉴</router-link>
      <router-link :to="{ path: '/burger' }">단품</router-link>
      <router-link :to="{ path: '/side' }">사이드</router-link>
      <router-link :to="{ path: '/beverage' }">음료</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Header.css";
</style>
