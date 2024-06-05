<script setup>
import { inject, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const state = inject('state');

if (!state) {
  console.error('state is not provided');
}

const updateSelectedOption = (newPath) => {
  const options = {
    '/suggest': 'suggest',
    '/setMenu': 'setMenu',
    '/burger': 'burger',
    '/side': 'side',
    '/beverage': 'beverage'
  };

  for (const path in options) {
    if (newPath.includes(path) && state.selectedOption !== options[path]) {
      state.selectedOption = options[path];
      break;
    }
  }
};

watch(() => route.path, (newPath) => {
  if (state) {
    updateSelectedOption(newPath);
  } else {
    console.error('state is not provided');
  }
});

watch(() => state.selectedOption, (newValue, oldValue) => {
  console.log(`선택된 옵션이 ${oldValue}에서 ${newValue}(으)로 변경되었습니다.`);
});


const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="HD">
    <div class="Hd_Top">
      <div class="Hd_Top_Front">
        <div class="Front_Eat" :class="{ activeOption: state.selectedOption === 'eat' }" @click="() => selectMenu('eat')">매장식사</div>
        <div class="Front_Packaging" :class="{ activeOption: state.selectedOption === 'packaging' }" @click="() => selectMenu('packaging')">포장주문</div>
      </div>
      <div class="Hd_Top_Back">
        <div @click="() => navigateTo('/')">첫 화면</div>
        <div @click="() => navigateTo('/guide')">사용안내</div>
        <div @click="() => navigateTo('/foodInfo')">영양정보</div>
        <div @click="() => navigateTo('/lang')">Language</div>
      </div>
    </div>
    <div class="Hd_Nav">
      <router-link to="/suggest">추천메뉴</router-link>
      <router-link to="/setMenu">세트메뉴</router-link>
      <router-link to="/burger">단품</router-link>
      <router-link to="/side" class="navButton" active-cl ass="activeLink">사이드</router-link>
      <router-link to="/beverage" class="navButton" active-class="activeLink">음료</router-link>
    </div>
  </div>
</template>

<style scoped>
.HD {
    height: 10%;
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
.Front_Eat, .Front_Packaging {
  border-radius: 30px;
  width: 80px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #000;
}
.Front_Eat {
  background-color: #FFF;
  color: #000; 
}
.Front_Packaging {
  background-color: #FFF;
  color: #000;
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

.Hd_Nav .router-link-exact-active {
    background-color: red;
    color: #FFF;
  }
.Hd_Nav a {
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

