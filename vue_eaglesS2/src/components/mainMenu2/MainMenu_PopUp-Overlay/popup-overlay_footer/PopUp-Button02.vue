<script setup>
import { useRouter } from "vue-router";
import { usePopupStore } from "@/stores/menuStore";

const router = useRouter();
const popUpStore = usePopupStore();

function ButtonClick() {
  popUpStore.togglePopUp2();
}

const payment = () => {
  router.push({ name: "Mainpayment" });
  console.log("Navigating to Mainpayment");
};
</script>

<template>
  <div class="popup-buttons02">
    <div class="previous-button02" @click="ButtonClick">이전</div>
    <div class="next-button02">
      <router-link :to="{path:'/Mainpayment'}">다음</router-link>
    </div>
  </div>
</template>
