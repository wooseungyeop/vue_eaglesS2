<script setup>
import { inject, defineEmits } from 'vue';
import Suggest from '@/components/mainMenuCard/Suggest.vue';
import SetMenu from '@/components/mainMenuCard/SetMenu.vue';
import Burger from '@/components/mainMenuCard/Burger.vue';
import Side from '@/components/mainMenuCard/Side.vue';
import Beverage from '@/components/mainMenuCard/Beverage.vue';

const state = inject('state');
const emit = defineEmits(['item-selected']);

function handleItemSelected(item) {
  emit('item-selected', item);
}

if (!state) {
  console.error('state is not provided');
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
article {
  height: 50%;
  width: 800px;
}
.Sc_Section {
  padding: 10px;
  height: 98%;
}
</style>
