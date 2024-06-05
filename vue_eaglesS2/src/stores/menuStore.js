import { defineStore } from 'pinia';
import { reactive } from 'vue';
import BurgerData from '@/data/BurgerData.json';

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    recommended: BurgerData.recommended,
    setMenu: BurgerData.setMenu,
    burgerMenu: BurgerData.burgerMenu,
    sideMenu: BurgerData.sideMenu,
    beverageMenu: BurgerData.beverageMenu,
    chunkedMenuItems: []
  }),
  actions: {
    fetchMenuItems(category) {
      this.chunkedMenuItems = this.chunkData(this[category]).map(chunk =>
        chunk.map(item => ({
          ...item,
          quantity: 1  // 모든 아이템에 quantity 초기값을 1로 설정
        }))
      );
    },
    chunkData(data, chunkSize = 3) {
      return data.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / chunkSize);
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      }, []);
    }
  }
});
export const useDeleteStore = defineStore('menu', {
  state: () => ({
    selectedItem: null
  }),
  actions: {
    setSelectedItem(item) {
      this.selectedItem = item;
    },
    removeSelectedItem() {
      this.selectedItem = null; // 아이템 제거
    }
  }
});

export const useStore = () => {
  const state = reactive({
    selectedItem: null
  });

  function setSelectedItem(item) {
    state.selectedItem = item;
  }

  return {
    state,
    setSelectedItem
  };
};