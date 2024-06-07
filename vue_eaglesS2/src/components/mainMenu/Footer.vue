<script setup>
import { ref, watch, defineProps, computed } from "vue";
import { usePopupStore } from '@/stores/menuStore';
import "animate.css";

const props = defineProps({
  selectedItem: Object,
});

const selectedItems = ref([]);
const popUpStore = usePopupStore();


function ButtonClick() {
  popUpStore.togglePopUp1();
}

watch(
  () => props.selectedItem,
  (newItem) => {
    if (newItem) {
      // 배열 내에서 동일한 id를 가진 아이템이 있는지 확인
      const itemExists = selectedItems.value.some(
        (item) => item.id === newItem.id
      );
      if (!itemExists) {
        // 중복되지 않는 경우에만 아이템을 배열에 추가
        selectedItems.value.push({ ...newItem, quantity: 1 });
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

const removeAllItems = () => {
  selectedItems.value = [];
};
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
          <div @click="removeAllItems">전체취소</div>
        </div>
        <div class="OrderButton animate__animated animate__headShake">
          <div @click="ButtonClick">주문하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Footer.css";
</style>
