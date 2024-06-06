<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToMainMenu = () => {
  router.push({ path: "/mainmenu" });
  console.log("Navigating to MainMenu");
};

const popUpfinal = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "block";
  } else {
    console.error("Popup overlay element not found.");
  }
};
</script>

<template>
  <div class="popup-buttons">
    <div class="previous-button" @click="goToMainMenu">
      <p>
        <a>이전</a>
      </p>
    </div>
    <div class="next-button" @click="popUpfinal">
      <p>
        <a>결제하기</a>
      </p>
    </div>
  </div>
</template>
