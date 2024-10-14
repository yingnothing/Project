<template>
    <div class="layout_container">
        <!-- 导航 -->
        <div class="layout_tabbar" :class="{ tabbar_expend: settingIconStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 左侧栏 -->
        <div class="layout_slider" :class="{ fold: settingIconStore.fold }">
            <Logo />
            <!-- 菜单的选项 -->
            <Menu :constantRoute="constantRoute"></Menu>
        </div>
        <!-- 内容 -->
        <div class="layout_main" :class="{ main_expend: settingIconStore.fold }">
            <!-- 这里呈现的是二级路由 -->
            <Main></Main>
        </div>
    </div>


</template>

<script lang="ts" setup>
import Logo from './logo/index.vue';
// 这个是外层的el-menu
import Menu from './menu/index.vue';
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取路由规则,传给菜单
import { constantRoute } from '../../router/routes';
// 引入控制折叠的仓库
import useSettingIconStore from '../../store/modules/SettingIcon';
const settingIconStore = useSettingIconStore()
</script>
<script lang="ts">
  export default {
    name: "layout"
  }
</script>
<style lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;


    // 菜单
    .layout_slider {
        // 用到绝对定位不占位置
        // position: absolute;
        width: $base-menu-width;
        height: 100vh;
        background-color: white;

        &.fold {
            width: $fold-menu-width;
        }
    }

    // 顶部导航
    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        left: $base-menu-width;
        top: 0;
        // 导航是否向左展开
        &.tabbar_expend {
            width: calc(100vw - $fold-menu-width);
            left: $fold-menu-width;
        }
    }

    .layout_main {
        // 用到绝对定位，不占位置，直接根据根元素绝对定位
        position: absolute;
        left: $base-menu-width;
        // 减去菜单的宽度
        width: calc(100% - $base-menu-width);
        // 顶部导航的距离
        top: $base-tabbar-height;
        padding:10px;
        overflow: auto;
        background-color: yellow;
          // main是否向左展开
        &.main_expend{
            width: calc(100vw - $fold-menu-width);
            left: $fold-menu-width;
        }
    }
}


// .layout_container{
//     // 确保如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 
//     overflow:auto;
//     display: flex;
//     width: 100%;
//     background-color: pink;
// }
// .menu{
//     height: 100vh;
//     position: fixed;
//     width:$base-menu-width;
//     background-color: blue;
// }
// .right_section {
//     position: relative;
//     display: flex;
//     flex-direction: column; /* 垂直排列 */
//     flex: 1; /* 填充剩余空间 */
// }
// .navigation{

//     top: 0;
//     left:260px;
//     width: calc(100% - $base-menu-width);
//     height: 70px;
//     background: green;
// }
// .contain{
//     top:70px ;
//     flex: 1; /* 填充剩余空间 */
//     left: $base-menu-width;
//     background-color: yellow;
// }
// 滚动条
// 美化滚动条
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    width: 6px;
    background: rgba(#101F1C, 0.1);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, .5);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    transition: background-color .3s;
    cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(144, 147, 153, .3);
}

// }</style>