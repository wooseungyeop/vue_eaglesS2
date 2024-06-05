<script setup>
import { ref, onMounted, computed } from 'vue';

const menuItems = ref([]);

onMounted(async () => {
  const response = await fetch('../../data/beverageMenu.json');
  const data = await response.json();
  menuItems.value = data;
});

const chunkedMenuItems = computed(() => {
  const chunks = [];
  for (let i = 0; i < menuItems.value.length; i += 3) {
    chunks.push(menuItems.value.slice(i, i + 3));
  }
  return chunks;
});
</script>

<template>
  <div class="Sc_Section_con">
    <div class="Section_Menu">
      <div class="Section_Menu_con">
        <div class="Menu_con_row" v-for="(chunk, index) in chunkedMenuItems" :key="index">
          <div class="con_row_card" v-for="(item, index) in chunk" :key="index">
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
}

.Section_Menu {
    width: 100%;
    display: flex;
    justify-content: center;
}

.Section_Menu_con {
    width: 100%;
    overflow-y: scroll;
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

.con_row_card>img {
    width: 95%;
    height: auto;
}

.con_row_card>p {
    text-align: center;
}
</style>
