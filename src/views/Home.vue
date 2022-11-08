<script setup>
import SearchBar from '../components/SearchBar.vue';
</script>

<template>
  <div class="page" style="background-color: rgb(250, 250, 250); ">
    <div class="title_forzen">
      <h1>热门问诊</h1>
      <div class="icon_top_right">
        <nut-icon name="message" size="24"></nut-icon>
      </div>
    </div>

    <!-- 下面是一堆各种各样的卡片 -->
    <div class="body">
      <div class="searchbar">
        <SearchBar></SearchBar>
      </div>

      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
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
  height: 160px;
  display: block;
  /* border: 1px solid red; */
}

.title_forzen>h1 {
  position: absolute;
  top: 4px;
}

.icon_top_right {
  position: absolute;
  top: 16px;
  right: 0px;

}

.card {
  widows: 90%;
  height: 200px;
  border: 2px solid gray;
}

.body {
  height: auto;
  overflow: scroll;
}

* {
  margin: 0px;
  padding: 0px;
}

.searchbar {
  position: inherit;
  top: 0px;

  height: 64px;
  /* border: 1px solid red; */

}
</style>
