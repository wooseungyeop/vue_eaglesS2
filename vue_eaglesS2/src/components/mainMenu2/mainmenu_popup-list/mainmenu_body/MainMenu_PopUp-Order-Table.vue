<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const store = useMenuStore();

function selectItem(item) {
  store.addSelectedItem(item); // 선택된 아이템을 스토어에 추가
}

const formattedPrices = computed(() =>
  store.selectedItems.map((item) => ({
    ...item,
    formattedPrice: `${(item.price * item.quantity).toLocaleString("ko-KR")}원`,
  }))
);

const totalPrice = computed(
  () =>
    `${store.selectedItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toLocaleString("ko-KR")} 원`
);
</script>

<template>
  <div class="order-table">
    <table class="list">
      <thead class="meue-list">
        <tr>
          <td>메뉴</td>
          <td>수량</td>
          <td>가격</td>
        </tr>
      </thead>

      <tbody class="menu1">
        <!-- 메뉴 -->
        <tr
          class="formattedPrices"
          v-for="(item, index) in formattedPrices"
          :key="index"
        >
          <div class="name">
            {{ item.name }}
          </div>
          <div class="option" v-if="item.option">- {{ item.option }}</div>
          <!-- 수량 -->
          <td>
            {{ item.quantity }}
          </td>
          <!-- 가격 -->
          <td style="padding: 16px">{{ item.formattedPrice }}</td>
        </tr>

        <tr class="menu-side1" style="font-size: 15px">
          <td class="menu-side2" style="padding-top: 10px"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.menu1 > tr {
  font-size: 20px;
}
.option {
  font-size: 18px;
  padding: 0 0 0 20px;
}
.name {
  font-size: 25px;
  padding: 5px 0 6px 20px;
}

tr > td:nth-child(1) {
  width: 60%;
  padding: 1px 1px 1px 20px;
}

tr > td:nth-child(2) {
  width: 25%;
  text-align: right;
  padding: 1px 20px 1px 1px;
}

tr > td:nth-child(3) {
  text-align: right;
  padding: 0 15px 0 0;
}
</style>
