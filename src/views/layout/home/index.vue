<template>
    <div>
        <h1>我是首页</h1>
    </div>
</template>

<script setup lang="ts">
// 登录之后进入该首页，马上发送请求获取用户相关的信息
import { onMounted } from 'vue';
import { useUserStore } from '../../../store/modules/user';
const userStore=useUserStore()
onMounted(()=>userStore.getUserInfo())
</script>

<style scoped>
/*  */
</style>