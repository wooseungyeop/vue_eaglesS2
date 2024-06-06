<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const popUpmyList = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "none";
  }
};

const payment = () => {
  router.push({ name: "Mainpayment" });
  console.log("Navigating to Mainpayment");
};
</script>

<template>
  <div class="popup-buttons02">
    <div class="previous-button02" @click="popUpmyList">이전</div>
    <div class="next-button02" @click="payment"><a>다음</a></div>
  </div>
</template>
