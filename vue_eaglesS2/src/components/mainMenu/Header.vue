<script setup>
import { reactive, inject } from 'vue';
import { useRoute } from 'vue-router';

const selectMenu = inject('selectMenu');
const route = useRoute();

const state = reactive({
  selectedMenu: '',
  selectedOption: ''
});

const eat = () => {
  state.selectedOption = 'eat';
};

const packaging = () => {
  state.selectedOption = 'packaging';
};

const home = () => {
  // 홈으로 이동하는 로직
};

const guide = () => {
  // 사용 안내 페이지로 이동하는 로직
};

const foodInfo = () => {
  // 영양 정보 페이지로 이동하는 로직
};

const lang = () => {
  // 언어 변경 로직
};
</script>

<template>
  <div class="HD">
    <div class="Hd_Top">
      <div class="Hd_Top_Front">
        <div class="Front_Eat" :class="{ activeOption: state.selectedOption === 'eat' }" @click="eat">매장식사</div>
        <div class="Front_Packaging" :class="{ activeOption: state.selectedOption === 'packaging' }" @click="packaging">포장주문</div>
      </div>
      <div class="Hd_Top_Back">
        <div @click="home">첫 화면</div>
        <div @click="guide">사용안내</div>
        <div @click="foodInfo">영양정보</div>
        <div @click="lang">Language</div>
      </div>
    </div>
    <div class="Hd_Nav">
      <div>
        <router-link to="/suggest" active-class="activeLink">추천메뉴</router-link>
      </div>
      <div>
        <router-link to="/setMenu" active-class="activeLink">세트메뉴</router-link>
      </div>
      <div>
        <router-link to="/burger" active-class="activeLink">단품</router-link>
      </div>
      <div>
        <router-link to="/side" active-class="activeLink">사이드</router-link>
      </div>
      <div>
        <router-link to="/beverage" active-class="activeLink">음료</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.HD {
    height: 10%
}
.Hd_Top {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
}
.Hd_Top_Front {
  display: flex;
  margin-left: 20px;
  padding: 10px;
}
.Hd_Top_Front > div {
  padding: 5px;
  margin-right: 10px;
}
.Front_Eat {
  background-color: #FFF;
  border-radius: 30px;
  width: 80px;
  text-align: center;
  color: #000; 
  cursor: pointer;
  border: 1px solid #000;
}
.Front_Packaging {
  border: 1px solid #FFF;
  border-radius: 30px;
  width: 80px;
  text-align: center;
  color: #000;
  cursor: pointer;
  border: 1px solid #000;
}
.Hd_Top_Back {
  display: flex;
  margin-right: 20px;
  padding: 5px;
  align-items: center;
  height: 20px;
}
.Hd_Top_Back > div {
  border-right: 1px solid #999;
  margin-right: 10px;
  color: #999;
  cursor: pointer;
  padding-right: 10px;
}
.Hd_Nav {
  display: flex;
  margin: 5px;
}

.activeOption {
  background-color: #000;
  color: #fff;
}

.activeLink {
  background-color: red; 
  color: white;
}

.Hd_Nav > div {
  display: flex;
  width: 20%;
  height: 40px;
  border: 1px solid #999;
  background-color: #999;
  color: #FFF;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 2px;
  cursor: pointer;
  text-decoration: none;
}
</style>

