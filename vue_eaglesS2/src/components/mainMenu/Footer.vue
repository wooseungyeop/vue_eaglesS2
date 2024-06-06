<script setup>
import { ref, watch, defineProps, computed } from "vue";
import "animate.css";

const props = defineProps({
  selectedItem: Object,
});

const selectedItems = ref([]);

watch(
  () => props.selectedItem,
  (newItem) => {
    if (newItem) {
      const existingItem = selectedItems.value.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // 기존 아이템의 수량을 증가
      } else {
        selectedItems.value.push({ ...newItem, quantity: 1 }); // 새 아이템 추가
      }
    }
  },
  { deep: true }
);

const incrementQuantity = (item) => {
  const index = selectedItems.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    const newItem = {
      ...selectedItems.value[index],
      quantity: selectedItems.value[index].quantity + 1,
    };
    selectedItems.value = [
      ...selectedItems.value.slice(0, index),
      newItem,
      ...selectedItems.value.slice(index + 1),
    ];
  }
};

const decrementQuantity = (item) => {
  const index = selectedItems.value.findIndex((i) => i.id === item.id);
  if (index !== -1 && selectedItems.value[index].quantity > 1) {
    const newItem = {
      ...selectedItems.value[index],
      quantity: selectedItems.value[index].quantity - 1,
    };
    selectedItems.value = [
      ...selectedItems.value.slice(0, index),
      newItem,
      ...selectedItems.value.slice(index + 1),
    ];
  }
};

const removeItem = (item) => {
  const index = selectedItems.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  }
};

const formattedPrices = computed(() => {
  return selectedItems.value.map((item) => ({
    ...item,
    formattedPrice:
      new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(
        item.price * item.quantity
      ) + "원",
  }));
});

const totalPrice = computed(() => {
  const total = selectedItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(total) + "원"
  );
});
</script>

<template>
  <div class="FT">
    <div class="Footer-Container">
      <div class="Footer_Top">
        <div class="Footer_Top_left">
          <div>주 문 목 록</div>
          <div class="orderCount">
            <div class="orderCount-con">
              <img src="/shoppingBag.svg" class="shoppingBag" />
              <div>{{ selectedItems.length }}</div>
            </div>
          </div>
        </div>
        <div class="Footer_Top_Right">
          <div>주 문 금 액</div>
          <div>{{ totalPrice }}</div>
        </div>
      </div>
      <div class="Footer_Info_Box">
        <table>
          <thead>
            <tr>
              <th class="col-menu">
                <div class="menu-title">메뉴</div>
              </th>
              <th class="col-quantity">수량</th>
              <th class="col-price">가격</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formattedPrices" :key="index">
              <td class="col-menu">
                <div class="menu-name">{{ item.name }}</div>
                <div v-if="item.option" class="menu-option">
                  - {{ item.option }}
                </div>
              </td>
              <td class="col-quantity">
                <div class="quantity-con">
                  <div
                    class="quantityMinus"
                    @click="decrementQuantity(item)"
                    :disabled="item.quantity <= 1"
                  >
                    -
                  </div>
                  <div>{{ item.quantity }}</div>
                  <div class="quantityPlus" @click="incrementQuantity(item)">
                    +
                  </div>
                </div>
              </td>
              <td class="col-price">
                <div class="price-con">
                  <div class="price-con-price">{{ item.formattedPrice }}</div>
                  <div class="price-Del" @click="removeItem(item)">x</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="Footer_Under animate__animated animate__headShake">
        <div class="PlusButton">
          <a href="Plus">+</a>
        </div>
        <div class="CouponButton animate__animated animate__headShake">
          <a href="useCoupon">쿠폰사용</a>
        </div>
        <div class="DelButton animate__animated animate__headShake">
          <a href="orderDelete">전체취소</a>
        </div>
        <div class="OrderButton animate__animated animate__headShake">
          <a href="orderLink">주문하기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Footer.css";
</style>
