<script setup>
import { computed } from "vue";
import { usePopupStore } from "@/stores/menuStore";
import Header from "../mainMenu/Header.vue";
import Section from "../mainMenu/Section.vue";
import Footer from "../mainMenu/Footer.vue";
import PopUp from "../mainMenu2/PopUp.vue";

const popUpStore = usePopupStore();

const popUpVisible = computed(() => popUpStore.showPopUp);
</script>

<template>
  <div class="All_Box">
    <Header />
    <Section />
    <Footer />
    <div v-show="popUpVisible">
      <PopUp />
    </div>
  </div>
</template>

<style scoped>
.All_Box {
  width: 800px;
  height: 100vh;
  margin: auto;
  border: 1px solid #000;
  overflow: hidden;
}
</style>
