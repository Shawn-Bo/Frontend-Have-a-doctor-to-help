<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
let router = useRouter();
let searchText = ref("");
let query = function () {
    router.push({
        path: "/query",
        query: { question: searchText.value }
    });
};

</script>

<template>
    <nut-searchbar v-model="searchText" placeholder="智能问诊，有医代劳。" background="rgb(250, 250, 250)"
        @keyup.enter.native="query" input-background="#fff">
        <template v-slot:rightin>
            <nut-icon size="20" name="microphone"></nut-icon>
        </template>
        <template v-slot:rightout>
            <nut-icon size="14" name="search2" @click="query"></nut-icon>
        </template>
    </nut-searchbar>
</template>

<style scoped>

</style>