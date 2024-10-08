<template>
    <!-- 根据路由动态渲染 -->
    <template v-for="item in constantRoute" :key="item.path">
        <!-- 先判断路由是否需要渲染在菜单上 -->
        <template v-if="!item.meta.hidden">

            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <!-- 将图标放title外面，这样折叠时就只折叠文字 -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item v-if="item.children && item.children.length === 1" :index="item.children[0].path">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 有多个孩子的,使用递归 -->
            <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.children[0].path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :constantRoute="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
defineProps(['constantRoute'])
// 点击跳转方法
const goRoute = (vm: any) => {
    console.log(vm.index);

}

</script>
<script lang="ts">
// 声明该组件名字,从而实现递归
export default {
    name: 'Menu'
}

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