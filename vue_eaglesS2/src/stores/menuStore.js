import { defineStore } from "pinia";
import BurgerData from "@/data/BurgerData.json";

// 메뉴관련 전역관리 로직
// Pinia 스토어를 정의하기 위해 defineStore 함수를 사용합니다.
export const useMenuStore = defineStore("menuStore", {
  // state는 스토어의 상태를 정의하는 객체입니다.
  state: () => ({
    recommended: BurgerData.recommended, // 추천 메뉴 데이터
    popuprecommended: BurgerData.popuprecommended, // 팝업 추천 메뉴 데이터
    setMenu: BurgerData.setMenu, // 세트 메뉴 데이터
    burgerMenu: BurgerData.burgerMenu, // 버거 메뉴 데이터
    sideMenu: BurgerData.sideMenu, // 사이드 메뉴 데이터
    beverageMenu: BurgerData.beverageMenu, // 음료 메뉴 데이터
    chunkedMenuItems: [], // 메뉴 아이템을 그룹화한 배열
    selectedItems: [], // 선택된 아이템 상태 추가
  }),
  // actions는 메서드를 정의하는 객체로, 상태를 비동기적으로 변경할 수 있습니다.
  actions: {
    // fetchMenuItems는 주어진 카테고리에 따라 메뉴 아이템을 가져오고 그룹화하는 함수입니다.
    fetchMenuItems(category) {
      this.chunkedMenuItems = this.chunkData(this[category]).map((chunk) =>
        chunk.map((item) => ({
          ...item,
          quantity: 1, // 모든 아이템에 quantity 초기값을 1로 설정
        }))
      );
    },
    // chunkData는 데이터를 주어진 크기의 청크로 나누는 함수입니다.
    chunkData(data, chunkSize = 3) {
      return data.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize); // 현재 인덱스를 청크 크기로 나누어 청크 인덱스를 계산
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // 해당 청크 인덱스가 비어있다면 새 배열을 생성
        }
        resultArray[chunkIndex].push(item); // 현재 아이템을 해당 청크에 추가
        return resultArray; // 결과 배열 반환
      }, []);
    },
    popUpfetchMenuItems(category) {
      this.chunkedMenuItems = this.popUpChunkData(this[category]);
    },
    popUpChunkData(data, chunkSize = 1) {
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
  },
});

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
};

export default stores;
