<script setup>
import { ref, watch, defineProps, computed } from 'vue';

const props = defineProps({
  selectedItem: Object
});

const selectedItems = ref([]);

watch(() => props.selectedItem, (newItem) => {
  if (newItem) {
    const existingItem = selectedItems.value.find(item => item.id === newItem.id);
    if (existingItem) {
      existingItem.quantity += 1;  // 기존 아이템의 수량을 증가
    } else {
      selectedItems.value.push({ ...newItem, quantity: 1 });  // 새 아이템 추가
    }
  }
}, { deep: true });

const incrementQuantity = (item) => {
  item.quantity++;
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (item) => {
  const index = selectedItems.value.indexOf(item);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  }
};

const totalPrice = computed(() => {
  return selectedItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});
</script>


<template>
<div class="FT">
    <div class="Footer-Container">
        <div class="Footer_Top">
            <div class="Footer_Top_left">
                <div>주문수량</div>
                <div>{{ selectedItems.length }}</div>
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
                            <div class="menu-name">메뉴</div>
                        </th>
                        <th class="col-quantity">수량</th>
                        <th class="col-price">가격</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in selectedItems" :key="index">
                        <td class="col-menu">
                            <div class="menu-name">{{ item.name }}</div>
                            <div class="menu-option">{{ item.option }}</div>
                        </td>
                        <td class="col-quantity">
                            <div class="quantity-con">
                                <button @click="decrementQuantity(item)" :disabled="item.quantity <= 1">-</button>
                                <div>{{ item.quantity }}</div>
                                <button @click="incrementQuantity(item)">+</button>
                            </div>
                        </td>
                        <td class="col-price">
                            <div class="price-con">
                                <div>{{ item.price * item.quantity}}원</div>
                                <div class="price-Del" @click="removeItem(item)"> x </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="Footer_Under">
            <div class="PlusButton">
                <a href="Plus">+</a>
            </div>
            <div class="CouponButton">
                <a href="useCoupon">쿠폰사용</a>
            </div>
            <div class="DelButton">
                <a href="orderDelete">전체취소</a>
            </div>
            <div class="OrderButton">
                <a href="orderLink">주문하기</a>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.FT {
  height: 40%;
  width: 800px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-radius: 20px;

}

.Footer-Container {
  height: 100%;
  border: 1px solid #888;
  border-radius: 20px 20px 20px 20px;
}

.Footer_Top {
  height: 10%;
  display: flex;
  justify-content: space-around;
  border: 1px solid #888;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.Footer_Top_left {
  display: flex;
  align-items: center;
  flex: 3.5;
  margin-left: 10px;
}

.Footer_Top_left div {
  margin-left: 10px;
  margin-right: 15px;
}

.Footer_Top_Right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 2;

}

.Footer_Info_Box {
  height: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid #888;
  overflow-y: scroll;
}

.Footer_Info_Box table {
  width: 100%;
  table-layout: fixed;
}

.Footer_Info_Box th,
.Footer_Info_Box td {
  border: 1px solid #ddd;
  padding: 8px;
}

.Footer_Info_Box th {
  background-color: #f2f2f2;
  position: sticky;
  top: -2px;
  z-index: 1;
}

.col-menu {
  width: 60%;
}

.col-quantity {
  width: 20%;
  text-align: center;
}

.quantity-con {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.col-price {
  width: 20%;
  text-align: center;
}

.price-con {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.quantity-PlusMino {
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 5px;
  color: #fff;
  align-content: center;
  cursor: pointer;
  text-align: center;
}

.price-Del {
  width: 30px;
  height: 30px;
  background-color: #888;
  border-radius: 5px;
  color: #fff;
  align-content: center;
  cursor: pointer;
  text-align: center;
}

.Footer_Under {
  height: 10%;
  display: flex;
  justify-content: space-around;
  border: 1px solid #000;
  align-items: center;
  border-radius: 0 0 20px 20px;
}


.PlusButton {
  width: 8%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 5px;
  background-color: #888;
}

.PlusButton a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.CouponButton {
  width: 36%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 30px;
  font: #fff;
  margin: 5px;
}

.CouponButton a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
}

.DelButton {
  width: 20%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #000;
  margin: 5px;
}

.DelButton a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.OrderButton {
  width: 36%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: red;
  margin: 5px;
}

.OrderButton a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
}

.menu-name {
  margin-left: 10px;
}

.menu-option {
  margin-left: 20px;
}
</style>