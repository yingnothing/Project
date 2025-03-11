<template>
    <div class="container" v-show="!settingIconStore.fold">
        <img src="../../../assets/vue.svg" alt="">
        <p >广工大平台</p>
    </div>
</template>

<script setup lang="ts">
import useSettingIconStore from '../../../store/modules/SettingIcon';
const settingIconStore = useSettingIconStore()
</script>
<script lang="ts">
  export default {
    name: "logo"
  }
</script>
<style scoped lang="scss">
.container{
    width: 100%;
    height: $base-logo-height;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 图片 */
    img{
        width: 40px;
        height: 40px;
        margin-right: 5px;
    }
    /* 字体 */
    p{
        color: #20dbfd;/* 浅蓝色 */
        text-shadow: 0 0 25px #00d8ff; /* 利用文字阴影 */
        font-size: 30px;
    }
}
</style>