<script setup>
import { onMounted } from "vue";

const skip = () => {
  const videoContainer = document.getElementById("btnfadeIn");
  videoContainer.classList.add("fade-out");

  setTimeout(() => {
    videoContainer.style.display = "none"; // 트랜지션이 끝난 후에 요소를 숨깁니다.
  }, 5000); // 트랜지션 지속 시간과 동일한 시간을 설정합니다.
};

onMounted(() => {
  setTimeout(skip, 31000);
});
setTimeout(skip, 31000);
</script>
<template>
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
</template>
