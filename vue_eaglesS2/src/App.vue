<script setup>
import MainComponent from "./components/mainIndex/MainComponent.vue";
import MainMenu from "./components/mainMenu/MainMenu.vue";
const popUp = () => {
  const element = document.getElementsByClassName("popup-list")[0];
  if (element) {
    element.style.display = "block";
  }
};

const popBack = () => {
  const element = document.getElementsByClassName("popup-list")[0];
  if (element) {
    element.style.display = "none";
  }
};

const popUp_final = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "block";
  }
};

const popUp_myList = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "none";
  }
};

const skip = () => {
  document.getElementById("btnfadeIn").classList.add("fade-out");
};
</script>

<template>
  <MainMenu />
</template>

<style scoped></style>
