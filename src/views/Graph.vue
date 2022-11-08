<script setup>
import SearchBar from '../components/SearchBar.vue';
</script>

<template>
    <div class="page" style="background-color: rgb(250, 250, 250); ">

        <div class="title_forzen">
            <h1>查看图谱</h1>
            <div class="icon_top_right">
                <nut-icon name="message" size="24"></nut-icon>
            </div>
        </div>
        <div class="searchbar_forzen">
            <SearchBar></SearchBar>
        </div>
        <div style="height: 160px;"></div>
        <!-- 下面是一堆各种各样的卡片 -->
        <div class="body">
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </div>

    </div>
</template>

<style scoped>
.page {
    overflow: auto;
    height: 92vh;
    display: -webkit-flex;
    -webkit-flex-direction: column;
}

.title_forzen {
    position: relative;
    left: 5%;
    width: 90%;
    height: 80px;
    /* border: 1px solid red; */
}

.title_forzen>h1 {
    position: absolute;
    top: 4px;
}

.searchbar_forzen {
    width: 100%;
    position: absolute;
    top: 48px;
}

.icon_top_right {
    position: absolute;
    top: 16px;
    right: 0px;
}

.searchbar {
    background-color: rgb(250, 250, 250);
    width: 100%;
    position: absolute;
}

* {
    background-color: rgb(250, 250, 250);
    margin: 0px;
    padding: 0px;
}

.card {
    widows: 90%;
    height: 300px;
    border: 2px solid gray;
}

.body {
    height: auto;
    overflow: scroll;
}
</style>
