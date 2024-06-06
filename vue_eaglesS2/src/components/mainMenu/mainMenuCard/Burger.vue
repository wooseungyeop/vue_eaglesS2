<script setup>
import { onMounted, computed, defineEmits } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const store = useMenuStore();
const emit = defineEmits(["item-selected"]);

onMounted(() => {
  store.fetchMenuItems("burgerMenu");
});

// store.chunkedMenuItems를 직접 참조하기 위해 reactive ref로 만들어줍니다.
const chunkedMenuItems = computed(() => store.chunkedMenuItems);

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
          v-for="(chunk, index) in chunkedMenuItems"
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
