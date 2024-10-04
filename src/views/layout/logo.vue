<template>
    <div class="container">
        <img src="../../assets/vue.svg" alt="">
        <p>广工大平台</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
    width: 100%;
    height: 50px;
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