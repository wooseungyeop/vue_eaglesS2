<script setup>
import { onMounted, computed, defineEmits } from 'vue';
import { useMenuStore } from '@/stores/menuStore';

const store = useMenuStore();
const emit = defineEmits(['item-selected']);

onMounted(() => {
  store.fetchMenuItems('setMenu');
});

// store.chunkedMenuItems를 직접 참조하기 위해 reactive ref로 만들어줍니다.
const chunkedMenuItems = computed(() => store.chunkedMenuItems);

function selectItem(item) {
  emit('item-selected', item);
}
</script>

<template>
  <div class="Sc_Section_con">
    <div class="Section_Menu">
      <div class="Section_Menu_con">
        <div class="Menu_con_row" v-for="(chunk, index) in chunkedMenuItems" :key="index">
          <div class="con_row_card" v-for="(item, index) in chunk" :key="index" @click="selectItem(item)">
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
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.Section_Menu {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
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
    width: calc(100% / 3 - 10px); /* 3개씩 나누고 간격 조정 */
    height: 200px;
    margin: 5px;
    cursor: pointer;
}

.con_row_card>img {
    width: 95%;
    height: auto; /* 이미지 비율 유지 */
}

.con_row_card>p {
    text-align: center;
}
</style>
