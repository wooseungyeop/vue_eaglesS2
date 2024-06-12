import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menuStore", {
  // state는 스토어의 상태를 정의하는 객체입니다.
  state: () => ({
    recommended: [], // 추천 메뉴 데이터
    popuprecommended: [], // 팝업 추천 메뉴 데이터
    setMenu: [], // 세트 메뉴 데이터
    burgerMenu: [], // 버거 메뉴 데이터
    sideMenu: [], // 사이드 메뉴 데이터
    beverageMenu: [], // 음료 메뉴 데이터
    chunkedMenuItems: [], // 메뉴 아이템을 그룹화한 배열
    selectedItems: [], // 선택된 아이템 상태 추가
  }),
  // actions는 메서드를 정의하는 객체로, 상태를 비동기적으로 변경할 수 있습니다.
  actions: {
    // fetchMenuItems는 주어진 카테고리에 따라 메뉴 아이템을 가져오고 그룹화하는 함수입니다.
    fetchMenuItems(category) {
      axios
        .get(`http://1.214.19.22:8002/${category}`)
        .then((response) => {
          this[category] = response.data;
          this.chunkedMenuItems = this.chunkData(this[category], category);
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    },
    chunkData(data) {
      const popupStore = usePopupStore(); // 팝업 스토어 인스턴스를 가져옵니다.
      const chunkSize = popupStore.showPopUp ? 1 : 3; // showPopUp 상태에 따라 chunkSize 결정
      return this.chunkDataHelper(data, chunkSize).map((chunk) =>
        chunk.map((item) => ({
          ...item,
          quantity: 1, // 모든 아이템에 quantity 초기값을 1로 설정
        }))
      );
    },
    chunkDataHelper(data, chunkSize) {
      return data.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
    },
    // 선택된 아이템을 배열에 추가하거나 수량 증가
    addSelectedItem(item) {
      const existingItem = this.selectedItems.find((i) => i.id === item.id);
      if (existingItem) {
        // 아이템이 이미 존재하면 수량만 증가
        existingItem.quantity++;
      } else {
        // 새 아이템이면 배열에 추가하고 수량을 1로 설정
        this.selectedItems.push({ ...item, quantity: 1 });
        console.log('Current selectedItems:', this.selectedItems);
      }
    },
    // 아이템을 배열에서 제거하는 액션
    removeSelectedItem(item) {
      this.selectedItems = this.selectedItems.filter((i) => i.id !== item.id);
    },
    // 모든 선택된 아이템을 제거하는 액션
    clearSelectedItems() {
      this.selectedItems = [];
    },
    // 아이템 수량 증가
    incrementItemQuantity(itemId) {
      const item = this.selectedItems.find((i) => i.id === itemId);
      if (item) {
        item.quantity++;
      }
    },
    // 아이템 수량 감소
    decrementItemQuantity(itemId) {
      const item = this.selectedItems.find((i) => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    reloadMenuItems() {
      this.fetchMenuItems("recommended");
    },
    saveOrder() { // 영수증 로직
      const orderStore = useOrderStore(); // 주문 옵션 스토어 사용
      const orderCountStore = useOrderCount();

      orderCountStore.incrementCount();
      
      const orderData = {
        orderCount: orderCountStore.orderCount, //주문번호
        items: this.selectedItems.map(item => ({
          id: item.id, // 메뉴 id
          name: item.name, // 메뉴 이름
          quantity: item.quantity, // 수량
          price: item.price, // 가격
          total: item.price * item.quantity // 항목별 총액
        })),
        total: this.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0), // 총 금액
        orderOption: orderStore.orderOption // 주문 옵션
      };
      axios
        .post('http://1.214.19.22:8002/OrderList', orderData)
        .then(response => {
          console.log('주문 저장 성공:', response.data);
          this.clearSelectedItems(); // 주문 후 선택된 아이템 목록 초기화
        })
        .catch(error => {
          console.error('주문 저장 실패:', error);
        });
    },
  },
});

export const useOrderCount = defineStore("count", {
  state: () => ({
    orderCount: 0,
  }),
  actions: {
    incrementCount() {
      this.orderCount++;
    }
  }
})

// 팝업관련 전역관리 로직
export const usePopupStore = defineStore("popup", {
  state: () => ({
    showPopUp: false,
    showPopUp2: false,
  }),
  actions: {
    togglePopUp1() {
      this.showPopUp = !this.showPopUp;
    },
    togglePopUp2() {
      this.showPopUp2 = !this.showPopUp2;
    },
  },
});

// 네비게이션 경로 설정관련 로직
export const navRootStore = defineStore("navRootStore", {
  state: () => ({
    selectedOption: "suggest", // 초기값 설정
  }),
  actions: {
    setSelectedOption(option) {
      this.selectedOption = option;
    },
  },
});

// 주문 옵션 설정관련 로직
export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    orderOption: "eat", // 초기값 설정
  }),
  actions: {
    setOrderOption(option) {
      this.orderOption = option;
    },
  },
});

const stores = {
  useMenuStore,
  usePopupStore,
  navRootStore,
  useOrderStore,
  useOrderCount,
};

export default stores;
