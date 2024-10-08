<!-- 顶部导航 -->
<template>
    <div class="tabbar">
        <div class="tabbar_left"  @click="settingIconStore.changeFold">
            <el-icon style="margin-right: 5px;cursor: pointer; ">
                <component :is="settingIconStore.fold?'Expand':'Fold'"></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb separator-icon="CaretRight">
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <!-- 按钮 -->
            <el-button icon="Refresh" circle />
            <el-button icon="FullScreen" circle />
            <el-button icon="Setting" circle />
            <img src="../../../assets/vue.svg" 
            style="width: 30px; height: 30px; 
            margin-left: 5px;
            ">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
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
const settingIconStore=useSettingIconStore()
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
.tabbar_right{
    display: flex;
    align-items: center;
}

</style>