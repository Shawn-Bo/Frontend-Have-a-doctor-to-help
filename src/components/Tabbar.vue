<template>
    <nut-tabbar v-model:visible="active" @tab-switch="tabSwitch">
        <nut-tabbar-item tab-title="逛首页" icon="home"></nut-tabbar-item>
        <nut-tabbar-item tab-title="看图谱" icon="find"></nut-tabbar-item>
        <nut-tabbar-item tab-title="问医生" icon="people"></nut-tabbar-item>
        <nut-tabbar-item tab-title="懂我的" icon="my"></nut-tabbar-item>
    </nut-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let active = ref(0);

function tabSwitch(item, index) {
    let router_dict = {
        0: "/home",
        1: "/graph",
        2: "/inquary",
        3: "/me"
    }
    if (active !== index) {
        active = index;
        router.push({ path: router_dict[index] });
    }

}
</script>


<style scoped></style>