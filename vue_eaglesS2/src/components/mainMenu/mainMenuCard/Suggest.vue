<script setup>
import { onMounted, defineProps, defineEmits } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const store = useMenuStore();
const props = defineProps({
  chunk: Array,
});
const emit = defineEmits(["item-selected"]);

onMounted(() => {
  store.fetchMenuItems("recommended");
});

function selectItem(item) {
  emit("item-selected", item);
}
</script>

<template>
  <div class="Sc_Section_con">
    <div class="Section_Menu">
      <div class="Section_Menu_con">
        <div
          class="Menu_con_row"
          v-for="(chunk, index) in store.chunkedMenuItems"
          :key="index"
        >
          <div
            class="con_row_card"
            v-for="(item, idx) in chunk"
            :key="idx"
            @click="selectItem(item)"
          >
            <img :src="item.img" alt="" />
            <p>{{ item.name }}</p>
            <p>{{ item.price }}원</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/MainMenuCard.css";
</style>
