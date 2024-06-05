<script setup>
const skip = () => {
  document.getElementById("btnfadeIn").classList.add("fade-out");
};
</script>

<template>
  <body>
    <div class="back_Box_All">
      <div class="back_Box">
        <div class="flicker">
          <a id="example" href="./main.html">주문하러 가기</a>
        </div>
      </div>
    </div>
    <div id="btnfadeIn">
      <div>
        <iframe
          src="/video/KFC_CF.mp4"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        >
        </iframe>
      </div>
      <div @click="skip">
        <div class="skip_Box">
          <p>skip</p>
        </div>
      </div>
    </div>
  </body>
  <RouterView />
</template>

<style scoped></style>
