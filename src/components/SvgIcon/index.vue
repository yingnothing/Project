<!-- 用于写图标 -->
<template>
    <svg>
        <use :xlink:href=prefix+name>

        </use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
    prefix:{
        type:String,
        default:"#icon-"
    },
    name:String
})
</script>

<style scoped>

</style>