<template>
  <section class="popBox">
    <div class="popBox_top">
      <div class="popInfo">
        <p class="popInfo-p">IC 카드를 삽입해주세요</p>
        <div class="cardPayBox">
          <img src=" /cardpay.png" />
        </div>
        <div class="payment">
          <div class="paymentBox" @click="confirm">결제승인</div>
          <div class="paymentBox" @click="back">결제취소</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import {useMenuStore} from "@/stores/menuStore.js";
import {useRouter } from "vue-router";
import {paymentWait} from "@/assets/js/mainMenu_js/modal.js";

const router = useRouter();
const menuStore = useMenuStore();
const confirm = () => {
   menuStore.clearSelectedItems();
   const wait = paymentWait();
   setTimeout(function(){
    router.push("/mainpage");
}, 3000);
}


const back = () => {
  const element = document.getElementsByClassName('popBox')[0];
  if (element) {
    element.style.display = 'none';
  }
};
</script>

