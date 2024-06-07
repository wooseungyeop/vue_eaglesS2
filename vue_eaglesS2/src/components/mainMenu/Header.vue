<script setup>
import { ref, inject, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const state = inject("state");

if (!state) {
  console.error("state is not provided");
}

const orderOption = ref("eat");

const selectMenu = (menu) => {
  orderOption.value = menu;
  console.log(orderOption.value);
};

const updateSelectedOption = (newPath) => {
  const options = {
    "/suggest": "suggest",
    "/setMenu": "setMenu",
    "/burger": "burger",
    "/side": "side",
    "/beverage": "beverage",
  };

  for (const path in options) {
    if (newPath.includes(path) && state.selectedOption !== options[path]) {
      state.selectedOption = options[path];
      break;
    }
  }
};

watch(
  () => route.path,
  (newPath) => {
    if (state) {
      updateSelectedOption(newPath);
    } else {
      console.error("state is not provided");
    }
  }
);

watch(
  () => state.selectedOption,
  (newValue, oldValue) => {
    console.log(
      `선택된 옵션이 ${oldValue}에서 ${newValue}(으)로 변경되었습니다.`
    );
  }
);

const navigateTo = (path) => {
  router.push(path);
};

</script>

<template>
  <div class="HD">
    <div class="Hd_Top">
      <div class="Hd_Top_Front">
        <div
          class="Front_Eat"
          :class="{ activeOption: orderOption === 'eat' }"
          @click="() => selectMenu('eat')"
        >
          매장식사
        </div>
        <div
          class="Front_Packaging"
          :class="{ activeOption: orderOption === 'packaging' }"
          @click="() => selectMenu('packaging')"
        >
          포장주문
        </div>
      </div>
      <div class="Hd_Top_Back">
        <div @click="() => navigateTo('/')">첫 화면</div>
        <div @click="() => navigateTo('/guide')">사용안내</div>
        <div @click="() => navigateTo('/foodInfo')">영양정보</div>
        <div @click="() => navigateTo('/lang')">Language</div>
      </div>
    </div>
    <div class="Hd_Nav">
      <router-link to="/suggest">추천메뉴</router-link>
      <router-link to="/setMenu">세트메뉴</router-link>
      <router-link to="/burger">단품</router-link>
      <router-link to="/side">사이드</router-link>
      <router-link to="/beverage">음료</router-link>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Header.css";
</style>
