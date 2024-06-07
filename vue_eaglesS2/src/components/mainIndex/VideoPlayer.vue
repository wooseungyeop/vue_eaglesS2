<script setup>
import { ref } from "vue";

const skip = () => {
  const videoContainer = document.getElementById("btnfadeIn");
  videoContainer.classList.add("fade-out");
  const iframe = videoContainer.querySelector("iframe");
  iframe.style.display = "none";
};
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
