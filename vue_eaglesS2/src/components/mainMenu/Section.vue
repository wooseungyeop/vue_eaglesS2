<script setup>
import { inject, defineEmits } from "vue";
import Suggest from "@/components/mainMenu/mainMenuCard/Suggest.vue";
import SetMenu from "@/components/mainMenu/mainMenuCard/SetMenu.vue";
import Burger from "@/components/mainMenu/mainMenuCard/Burger.vue";
import Side from "@/components/mainMenu/mainMenuCard/Side.vue";
import Beverage from "@/components/mainMenu/mainMenuCard/Beverage.vue";

const state = inject("state");
const emit = defineEmits(["item-selected"]);

function handleItemSelected(item) {
  emit("item-selected", item);
}

if (!state) {
  console.error("state is not provided");
}
console.log(state.selectedOption);
</script>

<template>
  <article>
    <section v-if="state.selectedOption === 'suggest'" class="Sc_Section">
      <Suggest @item-selected="handleItemSelected" />
    </section>
    <section v-if="state.selectedOption === 'setMenu'" class="Sc_Section">
      <SetMenu @item-selected="handleItemSelected" />
    </section>
    <section v-if="state.selectedOption === 'burger'" class="Sc_Section">
      <Burger @item-selected="handleItemSelected" />
    </section>
    <section v-if="state.selectedOption === 'side'" class="Sc_Section">
      <Side @item-selected="handleItemSelected" />
    </section>
    <section v-if="state.selectedOption === 'beverage'" class="Sc_Section">
      <Beverage @item-selected="handleItemSelected" />
    </section>
  </article>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Section.css";
</style>
