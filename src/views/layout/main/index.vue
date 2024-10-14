<!-- layout的内容区 -->
<template>
<router-view v-slot="{ Component }">
    <!-- 添加过渡动画 -->
  <transition name="fade">
    <!-- 这里是将被渲染在routerview的组件 -->
    <component :is="Component" v-if="flag"/>
  </transition>
</router-view>
</template>

<script setup lang="ts">
// 引入查看是否使用刷新的标志
import useSettingIconStore from '../../../store/modules/SettingIcon';
import {watch,ref,nextTick} from 'vue';
const flag=ref(true)
const settingStore=useSettingIconStore()
watch(()=>settingStore.clickRefresh,()=>{
    flag.value=false
    nextTick(()=>flag.value=true)
})
// 定义组件名称
defineOptions({
  name: "Main"
})
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-enter-from{
  opacity: 0;
}
</style>