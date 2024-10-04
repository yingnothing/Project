<template>
    <div class="layout_container">

        <div class="layout_tabbar">
            导航
        </div>
        <div class="layout_slider">
            <logo />
            <!-- 菜单的选项 -->
            <div>
                <!-- 查询ui组件库scrollbar的属性，写在.scrollbar里面 -->
                <el-scrollbar class="scrollbar">
                    <!-- 菜单折叠等 -->
                    <el-menu>
                        <el-menu-item index="1" >首页</el-menu-item>
                        <el-menu-item index="2" >数据大屏</el-menu-item>
                        <!-- 折叠 -->
                        <el-sub-menu index="1">
                            <template #title>
                                <span>权限管理</span>
                            </template>
                                <el-menu-item index="1-1">用户管理</el-menu-item>
                                <el-menu-item index="1-2">角色管理</el-menu-item>
                                <el-menu-item index="1-3">菜单管理</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </div>
        </div>
        <div class="layout_main">
            <p>段落</p>
        </div>
    </div>


</template>

<script lang="ts" setup>
import logo from './logo.vue';

</script>

<style lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background: red;

    // 菜单
    .layout_slider {
        // 用到绝对定位不占位置
        // position: absolute;
        width: $base-menu-width;
        height: 100vh;
        background-color: white;

        // 菜单里的选项
        .scrollbar {
            //这里的height是设置所能呈现的内容的高度，
            // 减去logo的高度，来确定高度，防止菜单选项过多而溢出
            height: calc(100% - $base-logo-height);

            // 设置字体和背景颜色
            .el-menu{
                --el-menu-bg-color:width;
            }
            .el-menu-item,.el-sub-menu {
                --el-menu-text-color: rgb(148, 37, 137);
            }
        }
    }

    // 顶部导航
    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: 70px;
        left: $base-menu-width;
        top: 0;
        background-color: green;
    }

    .layout_main {
        // 用到绝对定位，不占位置，直接根据根元素绝对定位
        position: absolute;
        left: $base-menu-width;
        // 减去菜单的宽度
        width: calc(100% - $base-menu-width);
        top: 70px;
        overflow: auto;
        background-color: yellow;
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