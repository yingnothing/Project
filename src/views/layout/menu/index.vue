<template>
    <div>
        <el-scrollbar class="scrollbar">
            <!-- 菜单折叠等 -->
            <el-menu :router="true" :default-active="$route.path"  :collapse="settingIconStore.fold" >
                <!-- 根据路由动态渲染 -->
                <Menu :constantRoute="constantRoute"></Menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Menu from './menu.vue';
// 引入控制折叠的仓库
import useSettingIconStore from '../../../store/modules/SettingIcon';
const settingIconStore = useSettingIconStore()
defineProps(['constantRoute'])

// 获取当前路径
const $route = useRoute()

</script>
<script lang="ts">


</script>
<style scoped lang="scss">
// 菜单里的选项
.scrollbar {
    //这里的height是设置所能呈现的内容的高度，
    // 减去logo的高度，来确定高度，防止菜单选项过多而溢出
    // 因为使用递归而使高度出现一点问题
    height: calc(100% - $base-logo-height);

    // 设置字体和背景颜色
    .el-menu {
        --el-menu-bg-color: width;
        border-right: 0;
    }

    .el-menu-item,
    .el-sub-menu {
        --el-menu-text-color: rgb(148, 37, 137);
    }
}
</style>