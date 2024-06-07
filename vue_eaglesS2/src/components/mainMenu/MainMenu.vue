<script setup>
import { provide, reactive, ref, computed } from "vue";
import { usePopupStore } from "@/stores/menuStore";
import Header from "../mainMenu/Header.vue";
import Section from "../mainMenu/Section.vue";
import Footer from "../mainMenu/Footer.vue";
import PopUp from "../mainMenu2/PopUp.vue";

// 상태 관리
const state = reactive({
  selectedOption: "suggest",
});

provide("state", state);

const selectedItem = ref({});
const popUpStore = usePopupStore();

function handleItemSelected(item) {
  selectedItem.value = item;
}

const popUpVisible = computed(() => popUpStore.showPopUp);

console.log(state.selectedOption);
</script>

<template>
  <div class="All_Box">
    <Header />
    <Section @item-selected="handleItemSelected" />
    <Footer :selectedItem="selectedItem" />
    <div v-show="popUpVisible">
      <PopUp/>
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
