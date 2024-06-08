<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMenuStore, navRootStore, useOrderStore } from "@/stores/menuStore";
import swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const itemstore = useMenuStore();
const store = navRootStore();
const orderStore = useOrderStore();

const updateSelectedOption = (newPath) => {
  console.log("New Path:", newPath); // 경로 변경 확인
  const options = {
    "/suggest": "suggest",
    "/setMenu": "setMenu",
    "/burger": "burger",
    "/side": "side",
    "/beverage": "beverage",
  };

  const matchedOption = Object.keys(options).find((path) => newPath === path);
  console.log("Matched Option:", matchedOption); // 일치하는 옵션 확인
  if (matchedOption && store.selectedOption !== options[matchedOption]) {
    store.setSelectedOption(options[matchedOption]);
  }
};

const showAlert = () => {
  swal.fire({
    title: "Error!",
    text: "미구현페이지입니다!",
    icon: "error",
    confirmButtonColor: "#ea0029",
    confirmButtonText: "확인",
  });
};

const foodInfo = () => {
  swal.fire({
    title: "영양 정보",
    html: `
      <img src="https://www.kfckorea.com/nas/kfcimg/info/info_nutrition.png" alt="영양 정보 이미지" style="width:100%; height:99%;">
    `,
    confirmButtonText: "확인",
    confirmButtonColor: "#ea0029",
    customClass: {
      popup: "swal-modal-foodinfo", // 이 클래스에 CSS 스타일을 적용
    },
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

const confirmAction = () => {
  swal
    .fire({
      title: "시작화면으로",
      text: "주문을 취소하고 이동하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea0029",
      cancelButtonColor: "#0f1822",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swal
          .fire({
            title: "시작화면으로",
            text: "주문을 취소하고 이동합니다",
            icon: "success",
            confirmButtonColor: "#ea0029",
            confirmButtonText: "승인",
          })
          .then(() => {
            itemstore.clearSelectedItems();
            router.push("/mainpage");
          });
      }
    });
};
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
