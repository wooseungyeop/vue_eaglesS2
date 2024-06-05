<script setup>
import { inject } from 'vue';
import Suggest from '@/components/mainMenuCard/Suggest.vue';
import SetMenu from '@/components/mainMenuCard/SetMenu.vue';
import Burger from '@/components/mainMenuCard/Burger.vue';
import Side from '@/components/mainMenuCard/Side.vue';
import Beverage from '@/components/mainMenuCard/Beverage.vue';

const selectedMenu = inject('selectedMenu');
</script>


<template>
    <article>
        <section v-if="selectedMenu === 'suggest'" class="Sc_Section">
            <Suggest/>
        </section>
        <section v-if="selectedMenu === 'setMenu'" class="Sc_Section">
            <SetMenu/>
        </section>
        <section v-if="selectedMenu === 'burger'" class="Sc_Section">
            <Burger/>
        </section>
        <section v-if="selectedMenu === 'side'" class="Sc_Section">
            <Side/>
        </section>
        <section v-if="selectedMenu === 'beverage'" class="Sc_Section">
            <Beverage/>
        </section>
    </article>
</template>

<style scoped>
article {
height: 50%;
}

.Sc_Section {
    padding: 10px;
    height: 98%;
}

.Sc_Section_con {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
}

.Section_Left {
    display: flex;
    width: 5%;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #999;
    background-color: #999;
    color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.Section_Right {
    display: flex;
    width: 5%;
    height: 40px;
    border-radius: 50%;
    border: 1px solid red;
    background-color: red;
    color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.Section_Menu {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 5px;
    margin: 10px;
    justify-content: center;
}

.Section_Menu_con {
    overflow-y: scroll;

}

.Section_Menu_con::-webkit-scrollbar {
    width: 1px;

}

.Section_Menu_con::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 100px;
}

.Menu_con_row {
    display: flex;
    flex-direction: row;
    padding: 10px;
}

.con_row_card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    margin: 5px;
    cursor: pointer;
}

.con_row_card>img {
    height: 100%;
    width: 95%;
}

.con_row_card>p {
    height: 15%;
    text-align: center;
}

.Section_Menu::-webkit-scrollbar {
    width: 0px;
}
</style>
