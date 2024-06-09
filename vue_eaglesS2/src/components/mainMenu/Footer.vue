<script setup>
import { ref, watch, computed } from "vue"; // Vue 3 Composition API의 ref, watch, computed 함수를 가져옵니다.
import { usePopupStore, useMenuStore } from "@/stores/menuStore"; // 상태 관리 스토어에서 사용할 함수를 가져옵니다.
import "animate.css"; // 애니메이션 CSS 라이브러리를 가져옵니다.
import swal from "sweetalert"; // 알림창을 위한 sweetalert 라이브러리를 가져옵니다.

const popUpStore = usePopupStore(); // 팝업 관련 상태를 관리하는 스토어를 사용합니다.
const store = useMenuStore(); // 메뉴 관련 상태를 관리하는 스토어를 사용합니다.
const animateLength = ref(false); // 애니메이션 상태를 관리하는 반응형 참조입니다.

// 애니메이션 클래스를 계산하여 반환
const animationClasses = computed(() => ({
  animate__animated: true, // 항상 애니메이션을 적용
  animate__rubberBand: animateLength.value, // animateLength 값에 따라 rubberBand 애니메이션 적용
}));

watch(
  () => store.selectedItems.length, // 선택된 아이템의 수를 감시
  (newLength, oldLength) => {
    // 새 길이와 이전 길이를 인자로 받음
    if (newLength !== oldLength) {
      // 길이가 변경되었을 때
      animateLength.value = true; // 애니메이션 상태를 활성화
      setTimeout(() => {
        // 1초 후에
        animateLength.value = false; // 애니메이션 상태를 비활성화
      }, 1000);
    }
  }
);

// 가격 포맷을 위한 계산된 속성
const formattedPrices = computed(() => {
  return store.selectedItems.map((item) => ({
    ...item,
    formattedPrice:
      new Intl.NumberFormat("ko-KR", {
        style: "decimal", // "currency" 대신 "decimal" 사용
        maximumFractionDigits: 0, // 소수점 없이 정수만 표시
      }).format(item.price * item.quantity) + "원", // 숫자 뒤에 "원"을 붙임
  }));
});

// 총 주문 금액 계산
const totalPrice = computed(() => {
  const total = store.selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    new Intl.NumberFormat("ko-KR", {
      style: "decimal", // "currency" 대신 "decimal" 사용
      maximumFractionDigits: 0, // 소수점 없이 정수만 표시
    }).format(total) + " 원" // 숫자 뒤에 "원"을 붙임
  );
});

const showAlert = () => {
  swal("Error!", "미구현 기능입니다", "error"); // 미구현 기능에 대한 알림창
};

const noCountAlert = () => {
  swal("주문오류!", "주문목록이 없습니다", "error"); // 주문 목록이 없을 때의 알림창
};

// 아이템 수량 조절 함수
function incrementQuantity(item) {
  store.incrementItemQuantity(item.id); // 아이템 수량 증가
}

function decrementQuantity(item) {
  store.decrementItemQuantity(item.id); // 아이템 수량 감소
}

function removeItem(item) {
  store.removeSelectedItem(item); // 아이템 제거
}

function removeAllItems() {
  store.clearSelectedItems(); // 모든 아이템 제거
}

function ButtonClick() {
  if (store.selectedItems.length === 0) {
    noCountAlert(); // 주문 목록이 없으면 알림창 표시
  } else {
    popUpStore.togglePopUp1(); // 주문 처리 로직
  }
}
</script>

<template>
  <div class="FT">
    <div class="Footer-Container">
      <div class="Footer_Top">
        <div class="Footer_Top_left">
          <div>주문목록</div>
          <div class="orderCount">
            <div class="orderCount-con">
              <img src="/shoppingBag.svg" class="shoppingBag" />
              <div :class="animationClasses">
                {{ store.selectedItems.length }}
              </div>
            </div>
          </div>
        </div>
        <div class="Footer_Top_Right">
          <div>주문금액</div>
          <div>{{ totalPrice }}</div>
        </div>
      </div>
      <div class="Footer_Info_Box">
        <table>
          <thead>
            <tr>
              <th class="col-menu"><div class="menu-name">메뉴이름</div></th>
              <th class="col-quantity"><div class="quantity-con">수량</div></th>
              <th class="col-price"><div class="price-con-price">가격</div></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in formattedPrices"
              :key="index"
              class="animate__animated animate__fadeInUp"
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
                    :class="{
                      greyButton: item.quantity === 1,
                      defaultButton: item.quantity > 1,
                    }"
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
        <div class="PlusButton" @click="showAlert">+</div>
        <div class="CouponButton" @click="showAlert">쿠폰사용</div>
        <div class="DelButton" @click="removeAllItems">전체취소</div>
        <div class="OrderButton" @click="ButtonClick">주문하기</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/mainMenuCSS/Footer.css";
</style>
