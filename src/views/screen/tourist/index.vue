<template>
    <div class="box">
        <div class="sstatistics">
            <p class="title">
                实时游客统计
            </p>
            <p class="bg"></p>
            <p class="right">
                可预约总量777777人
            </p>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
const charts=ref()

onMounted(()=>{
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(charts.value);
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
  },
  yAxis: {},
  series:  [{
        type: 'liquidFill',
        data: [0.6, 0.4],
        color: ['red', '#0f0', 'rgb(0, 0, 255)'],
        itemStyle: {
                opacity: 0.6
        },
        emphasis: {
            itemStyle: {
                opacity: 0.9
            }
        }
    }]
});
})
</script>

<style scoped>
.box {
    background: url(../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    .sstatistics {
        color: white;
        margin-left: 20px;
        .title{
            font-size: 20px;
            margin-top: 5px;
        }
        .bg{
            width: 68px;
            height: 7px;
            margin-top: 5px;
            background: url(../images/dataScreen-title.png) no-repeat;
        }
        .right{
            float: right;
        }
    }
}
.charts{
    height: 100%;
    width: 100%;
}
</style>