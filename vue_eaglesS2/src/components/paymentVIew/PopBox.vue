<template>
  <section class="popBox">
    <div class="popBox_top">
      <div class="popInfo">
        <p class="popInfo-p">IC 카드를 삽입해주세요</p>
        <div class="cardPayBox">
          <img src=" /cardpay.png" />
        </div>
        <div class="payment">
          <div class="paymentBox">결제승인</div>
          <div class="paymentBox" @click="back">결제취소</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const back = () => {
  const element = document.getElementsByClassName('popBox')[0];
  if (element) {
    element.style.display = 'none';
  }
};
</script>

