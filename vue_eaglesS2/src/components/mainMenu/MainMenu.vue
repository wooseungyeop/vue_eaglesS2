<script setup>
import { provide, reactive, ref } from "vue";
import Header from "../mainMenu/Header.vue";
import Section from "../mainMenu/Section.vue";
import Footer from "../mainMenu/Footer.vue";

// 상태 관리
const state = reactive({
  selectedOption: "suggest",
});

provide("state", state);

const selectOption = (option) => {
  state.selectedOption = option;
};

const selectedItem = ref({});
function handleItemSelected(item) {
  selectedItem.value = item;
}

console.log(state.selectedOption);
</script>

<template>
  <div class="All_Box">
    <Header />
    <Section @item-selected="handleItemSelected" />
    <Footer :selectedItem="selectedItem" />
  </div>
</template>

<style scoped>
.All_Box {
  width: 800px;
  height: 100vh;
  margin: auto;
  border: 1px solid #000;
}
</style>
