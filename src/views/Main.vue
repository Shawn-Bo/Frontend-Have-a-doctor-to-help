<script setup>
import Tabbar from '/src/components/Tabbar.vue'
</script>

<template>
  <RouterView></RouterView>
  <!-- 底部导航 -->
  <div class="footer">
    <Tabbar></Tabbar>
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 0px;
  width: 99%;
}
</style>
