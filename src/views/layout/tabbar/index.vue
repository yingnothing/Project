<!-- 顶部导航 -->
<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right: 8px;cursor: pointer; " @click="settingIconStore.changeFold">
                <component :is="settingIconStore.fold ? 'Expand' : 'Fold'"></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb separator-icon="CaretRight">
                <!-- 添加to属性实现点击面包屑可以跳转 -->
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path"
                    v-show="item.meta.title">
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <!-- 按钮 -->
            <el-button icon="Refresh" circle @click="refresh" />
            <el-button icon="FullScreen" circle @click="changeFullScreen" />
            <el-button icon="Setting" circle />
            <img :src="userStore.avatar" style="width: 30px; height: 30px; border-radius:50%; 
            margin:0 8px;
            ">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{userStore.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入控制折叠的仓库
import useSettingIconStore from '../../../store/modules/SettingIcon';
const settingIconStore = useSettingIconStore()
// 引入用户仓库获取用户名和头像
import { useUserStore } from '../../../store/modules/user';
// 获取路由的meta
import { useRoute } from 'vue-router';
const $route = useRoute()
const userStore=useUserStore()
// 点击刷新按钮后更新仓库中的标志
const refresh = () => {
    settingIconStore.refresh()
}
// 全屏功能
const changeFullScreen = () => {
    // 拿到当前是否全屏的属性
    const fullscreen = document.fullscreenElement
    if (!document.fullscreenEnabled) {
        return
    } else if (fullscreen) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    background-image: linear-gradient(to left, rgba(207, 18, 217, 0), rgb(20, 148, 69));
}

.tabbar_left {
    display: flex;
}

.tabbar_right {
    display: flex;
    align-items: center;
}
</style>