<script setup>
import { onMounted, defineProps, defineEmits } from 'vue';
import { useMenuStore } from '@/stores/menuStore';

const store = useMenuStore();
const props = defineProps({
  chunk: Array
});
const emit = defineEmits(['item-selected']);

onMounted(() => {
  store.fetchMenuItems('recommended');
});

function selectItem(item) {
  emit('item-selected', item);
}

</script>

<template>
  <div class="Sc_Section_con">
    <div class="Section_Menu">
      <div class="Section_Menu_con">
        <div class="Menu_con_row" v-for="(chunk, index) in store.chunkedMenuItems" :key="index">
          <div class="con_row_card" v-for="(item, idx) in chunk" :key="idx" @click="selectItem(item)">
            <img :src="item.img" alt="">
            <p>{{ item.name }}</p>
            <p>{{ item.price }}원</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Sc_Section_con {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #000;
}
.Section_Menu {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.Section_Menu_con {
  overflow-y: scroll;
  width: 100%;
}
.Menu_con_row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.con_row_card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% / 3 - 10px);
  height: 200px;
  margin: 5px;
  cursor: pointer;
}
.con_row_card > img {
  width: 95%;
  height: auto;
}
.con_row_card > p {
  text-align: center;
}
</style>
