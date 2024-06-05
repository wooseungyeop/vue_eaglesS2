<script setup>
import { reactive, provide } from 'vue';
import Header from '../mainMenu/Header.vue';
import Section from '../mainMenu/Section.vue';
import Footer from '../mainMenu/Footer.vue';

const state = reactive({
  selectedMenu: ''
});

const selectMenu = (menu) => {
  state.selectedMenu = menu;
};

// 상태와 함수를 자식 컴포넌트에 제공
provide('selectMenu', selectMenu);
provide('selectedMenu', state.selectedMenu);
</script>

<template>
  <div class="All_Box">
    <Header/>
    <Section/>
    <Footer/>
  </div>
</template>

<style scoped>
.All_Box {
    width: 800px;
    height: 100vh;
    margin: auto;
    border: 1px solid #000;
}
</style>
