<script setup>
    import {useRouter} from "vue-router";
    const router = useRouter();

     
    const eat = () => {
        router.push("/mainmenu")
    }

    const packaging = () => {
        router.push("/mainmenu")
    }
</script>

<template>
    <div class="buttonBox">
      <div class="here" @click="eat">
        <img src="../../../public/img/here.png" class="buttonImg" />
        매장 식사
      </div>
      <div class="takeaway" @click="packaging">
        <img src="../../../public/img/takeaway.png" class="buttonImg" />
        포장 주문
      </div>
    </div>
</template>

<style scoped>
</style>