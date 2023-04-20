<script setup>
import { Notify } from "@nutui/nutui";
import { ref } from "vue";
import { useRouter } from 'vue-router';
let router = useRouter();
let searchText = ref("");
let query = function () {
    if (searchText.value !== "") {
        router.push({
            path: "/query",
            query: { question: searchText.value }
        });
    } else {
        Notify.warn("请先输入要查询的问题！", { duration: 500 });
    }
};

</script>

<template>
    <nut-searchbar v-model="searchText" placeholder="智能问诊，有医代劳。" background="rgb(250, 250, 250)" @keyup.enter.native="query"
        input-background="#fff">
        <template v-slot:rightin>
            <!-- <nut-icon size="20" name="microphone"></nut-icon> -->
            <nut-icon size="18" name="search2" @click="query"></nut-icon>
        </template>
    </nut-searchbar>
</template>

<style scoped></style>