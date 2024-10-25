<template>
    <div>
        <category :SPU="true">
        </category>
        <el-card>
            <el-button type="primary" icon="Plus">
                添加品牌
            </el-button>
            <el-table :border="true" :data="baseSPUDataList">
                <el-table-column label="序号" type="index" width="80px">

                </el-table-column>
                <el-table-column label="SPU名称" prop="spuName">

                </el-table-column>
                <el-table-column label="SPU描述" prop="description">

                </el-table-column>
                <el-table-column label="SPU操作">
                    <template>
                        <el-button type="primary" icon="Plus" title="添加SKU"></el-button>
                        <el-button type="primary" icon="Edit" title="修改SKU"></el-button>
                        <el-button type="primary" icon="View" title="查看SKU列表"></el-button>
                        <el-button type="primary" icon="Delete" title="删除已有SKU"></el-button>

                        
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[3,5,7]" :disabled="false" layout=" prev, pager, next, jumper,->, sizes,total"
                v-model:total="total" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import category from '../../../components/category/index.vue'
import { onMounted, ref,watch } from 'vue'
import { useAttrStore, } from '../../../store/modules/attr';
import { reqBaseSPUData } from '../../../api/product/spu';
const attrStore = useAttrStore()
// 存储获取到的表格数据
const baseSPUDataList=ref([])
// 当前页
let currentPage = ref(1)
// 一页的数据
let pageSize = ref(2)
// 获取的数据总量
let total=ref(0)
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