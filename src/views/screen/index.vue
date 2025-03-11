<template>
    <div class="contain">
        <div class="screen" ref="screen">
            <div class="top">
                <div class="left">
                    <div class="lbtn">
                        首页
                    </div>
                </div>
                <div class="center">
                    智慧旅游可视化大数据平台
                </div>
                <div class="right">
                    <span class="rbtn">统计报告</span>
                    <span class="time">当前时间:{{ time }}</span>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <tourist class="tourist"></tourist>
                    <sex class="sex"></sex>
                    <age class="age"></age>
                </div>
                <div class="center">
                    中
                </div>
                <div class="right">
                    
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted,ref } from 'vue';
import tourist from './tourist/index.vue'
import sex from './sex/index.vue'
import age from './age/index.vue'
import moment from 'moment';
const screen=ref()
let getScale=()=>{
    const h=window.innerHeight
    const w=window.innerWidth
    const scaleW=w/1920
    const scaleH=h/1080
    return scaleH>scaleW?scaleW:scaleH
}
let timer=ref()
// 获取时间
let time=ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
// 拉到左上角
onMounted(()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
    // 启动计算器
    timer.value = setInterval(()=>{
        time.value=moment().format('YYYY年MM月DD日 hh:mm:ss')
    },1000)
})
// 变化时调整
window.onresize=()=>{
    screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
}
onBeforeUnmount(()=>{
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.contain {
background: url(./images/bg.png) no-repeat;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    .screen{
        position: fixed;
        height: 1080px;
        width: 1920px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        .top {
            width: 100%;
            height: 50px;
            display: flex;
            .left{
                flex:1.3;
                background: url(./images/dataScreen-header-left-bg.png) no-repeat;
                background-size: cover;
                .lbtn{
                    width: 100px;
                    height: 100%;
                    background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
                    background-size: 100% 100%;
                    font-size: 20px;
                    line-height: 50px;
                    text-align: center;
                    color: #29fcff;
                    float: right;
                }
            }
            .center{
                flex:2;
                background:url(./images/dataScreen-header-center-bg.png) no-repeat;
                background-size: 100% 100%;
                height: 70px;
                color: #29fcff;
                font-size: 35px;
                line-height: 70px;
                text-align: center;
            }
            .right{
                flex:1.3;
                background: url(./images/dataScreen-header-right-bg.png) no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: space-between;
                color: #29fcff;
                font-size: 20px;
                text-align: center;
                line-height: 50px;
                .rbtn{
                    height: 50px;
                    width: 140px;
                    background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
                    background-size: 100% 100%;
                }
                .time{
                    margin-right: 10px;
                }
            }
        }
        .bottom{
            display: flex;
            .left{
                flex:1;
                display: flex;
                flex-direction: column;
                height:1030px;
                .tourist{
                    flex: 1.2;
                }
                .sex{
                    flex: 1;
                }
                .age{
                    flex: 1;

                }
            }
            .center{
                flex:2;
            }
            .right{
                flex:1;
            }
        }
    }
   
}
</style>