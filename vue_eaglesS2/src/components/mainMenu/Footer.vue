<script setup>
import { computed } from "vue";
import { usePopupStore, useMenuStore } from "@/stores/menuStore";
import "animate.css";

const popUpStore = usePopupStore();
const store = useMenuStore();

// 가격 포맷을 위한 계산된 속성
const formattedPrices = computed(() => {
  return store.selectedItems.map((item) => ({
    ...item,
    formattedPrice: new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(item.price * item.quantity),
  }));
});

// 총 주문 금액 계산
const totalPrice = computed(() => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(
    store.selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );
});

// 아이템 수량 조절 함수
function incrementQuantity(item) {
  store.incrementItemQuantity(item.id);
}

function decrementQuantity(item) {
  store.decrementItemQuantity(item.id);
}

function removeItem(item) {
  store.removeSelectedItem(item);
}

function removeAllItems() {
  store.clearSelectedItems();
}

function ButtonClick() {
  popUpStore.togglePopUp1();
}
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
              <div>{{ store.selectedItems.length }}</div>
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
              <th class="col-menu">메뉴</th>
              <th class="col-quantity">수량</th>
              <th class="col-price">가격</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in formattedPrices"
              :key="index"
              class="animate__animated animate__bounceIn"
            >
              <td class="col-menu">
                <div class="menu-name">{{ item.name }}</div>
                <div v-if="item.option" class="menu-option">
                  - {{ item.option }}
                </div>
              </td>
              <td class="col-quantity">
                <div class="quantity-con">
                  <button
                    class="quantityMinus"
                    @click="decrementQuantity(item)"
                    :disabled="item.quantity <= 1"
                  >
                    -
                  </button>
                  <div>{{ item.quantity }}</div>
                  <button class="quantityPlus" @click="incrementQuantity(item)">
                    +
                  </button>
                </div>
              </td>
              <td class="col-price">
                <div class="price-con">
                  <div class="price-con-price">{{ item.formattedPrice }}</div>
                  <button class="price-Del" @click="removeItem(item)">x</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="Footer_Under">
        <div class="PlusButton">+</div>
        <div class="CouponButton">쿠폰사용</div>
        <div class="DelButton" @click="removeAllItems">전체취소</div>
        <div class="OrderButton" @click="ButtonClick">주문하기</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Footer.css";
</style>
