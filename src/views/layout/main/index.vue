<!-- layout的内容区 -->
<template>
<router-view v-slot="{ Component }">
    <!-- 添加过渡动画 -->
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-enter-from{
  opacity: 0;
}
</style>