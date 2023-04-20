<script setup>
import Tabbar from '/src/components/Tabbar.vue';
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">

      <transition name="page_transition" mode="out-in">
        <component :is="Component" />
      </transition>


    </RouterView>
    <!-- 底部导航 -->
    <div class="footer">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 0px;
  width: 99%;
}



.page_transition-enter-from {
  transform: translateY(100%);
}

.page_transition-enter-to {
  transform: translateY(0);
}

.page_transition-enter-active {
  transition: 0.2s;
}
</style>
