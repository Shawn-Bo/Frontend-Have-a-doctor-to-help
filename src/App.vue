<script setup>
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <transition name="page_transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
* {
  background-color: rgb(250, 250, 250);
  margin: 0px;
  padding: 0px;
}


.page_transition-enter-from {
  transform: translateX(100%);
}

.page_transition-enter-to {
  transform: translateX(0);
}

.page_transition-enter-active {
  transition: 0.2s ease;
}
</style>
