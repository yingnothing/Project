<template>
    <div>
        <category :SPU="true">
        </category>
        <el-card v-show="scene===0">
            <el-button type="primary" icon="Plus" @click="addSPU">
                添加SPU
            </el-button >
            <el-table :border="true" :data="baseSPUDataList" style="margin: 10px 0;">
                <el-table-column label="序号" type="index" width="80px">

                </el-table-column>
                <el-table-column label="SPU名称" prop="spuName">

                </el-table-column>
                <el-table-column label="SPU描述" prop="description">

                </el-table-column>
                <el-table-column label="SPU操作">
                    <template #="{row}">
                        <el-button type="primary" icon="Plus" title="添加SKU" @click="addSKU" size="small"></el-button>
                        <el-button type="primary" icon="Edit" title="修改SKU" size="small" @click="editSKU(row)"></el-button >
                        <el-button type="primary" icon="View" title="查看SKU列表" size="small"></el-button>
                        <el-button type="primary" icon="Delete" title="删除已有SKU" size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[3,5,7]" :disabled="false" layout=" prev, pager, next, jumper,->, sizes,total"
                v-model:total="total" />
        </el-card>
        <spuForm v-show="scene===1" @changeScene="changeScene" ref="spu"></spuForm>
        <skuForm v-show="scene===2"></skuForm>
    </div>
</template>

<script setup lang="ts">
import category from '../../../components/category/index.vue'
import { onMounted, ref,watch } from 'vue'
import { useAttrStore, } from '../../../store/modules/attr';
import { reqBaseSPUData,} from '../../../api/product/spu';
import skuForm from './skuForm.vue';
import spuForm from './spuForm.vue';
const attrStore = useAttrStore()
// 控制卡片场景切换的变量
const scene=ref(0)
// 存储获取到的表格数据
const baseSPUDataList=ref([])
// 当前页
let currentPage = ref(1)
// 一页的数据
let pageSize = ref(2)
// 获取的数据总量
let total=ref(0)
// 拿到spu实例
const spu=ref()
// 改变场景自定义事件
const changeScene=async(newscene:number,flag:any)=>{
    // 判断是修改还是添加决定是否重新回到第一页
    if(!flag){
        currentPage.value=1
    }
    scene.value=newscene
    const res:any=await reqBaseSPUData(currentPage.value,pageSize.value,attrStore.selectThree)
    baseSPUDataList.value=res.data.records
    total.value=res.data.total
}
// 添加品牌按钮
const addSPU=()=>{
    // 因为点击修改会将baseSPUDataList里面的row即spu信息并传给spuform组件进行渲染，所以这里在切换卡片时要清空
    spu.value.initAddSpu(attrStore.selectThree)
    scene.value=1
}
// 添加SKU按钮
const addSKU=()=>{
    scene.value=2
}
// 修改SKU按钮，调用spu实例的方法，让spu实例获取数据
const editSKU=async (row:any)=>{
    await spu.value.initSkuData(row)
    scene.value=1
}
// 获取分类
onMounted(() => {
    attrStore.getC1()
})
// 当第三个分类发生变化就调用接口
watch(()=>attrStore.selectThree,async()=>{
    const res:any=await reqBaseSPUData(currentPage.value,pageSize.value,attrStore.selectThree)
    console.log(res);
    baseSPUDataList.value=res.data.records
    total.value=res.data.total
})
// 选择其它页数
watch(()=>currentPage.value,async()=>{
    const res:any=await reqBaseSPUData(currentPage.value,pageSize.value,attrStore.selectThree)
    console.log(res);
    baseSPUDataList.value=res.data.records
    total.value=res.data.total

})
// 选择一页的数据
watch(()=>pageSize.value,async()=>{
    currentPage.value=1
    const res:any=await reqBaseSPUData(currentPage.value,pageSize.value,attrStore.selectThree)
    console.log(res);
    baseSPUDataList.value=res.data.records
    total.value=res.data.total

})
</script>
<style scoped></style>