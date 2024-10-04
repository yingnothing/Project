<template>
    <div class="layout_container">

        <div class="layout_tabbar">
            导航
        </div>
        <div class="layout_slider">
            <logo/>
        </div>
        <div class="layout_main">
            <p style="height: 2000px;">段落</p>
        </div>
    </div>


</template>

<script lang="ts" setup>
import logo from './logo.vue';

</script>

<style  lang="scss">
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
        // 用到相对定位，因为前面两个都不占位置，所以根据自己原来的位置相对定位就行了   
        position: absolute;
        left: $base-menu-width;
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
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
// }</style>