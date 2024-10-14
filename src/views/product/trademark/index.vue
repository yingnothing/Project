<!-- 品牌管理 -->
<template>
  <!-- 卡片 -->
  <el-card style="max-width: 100%">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table :data="tableData" :border="true" style="width: 100%;margin:10px 0px" >
      <el-table-column label="序号" width="80" type="index" />
      <!-- 使用插槽自己写样式，row为tableData数组每一个item -->
      <el-table-column label="品牌名称" width="180">
        <!-- 展示品牌名称 -->
        <template v-slot="{ row }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 展示品牌logo -->
        <template v-slot="{ row }">
          <img :src="row.logoUrl" style="width: 120px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="品牌操作" min-width="120">
        <template #default>
          <el-button link type="primary" size="small" icon="Edit">修改</el-button>
          <el-button link type="danger" size="small" icon="Delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- 
     当前页数 current-page
     每页显示条目个数 page-size
     每页显示个数选择器的选项设置 page-sizes
     	分页大小 size
      当选择页数发生改变的时候，就重新发送请求，发送请求需要的currentPage和page_size已通过v-model实时更新 current-change
      更改每页几条数据时触发size-change
     -->
    <el-pagination 
    
    @current-change="getTrademark"
    @size-change="sizeChange"
    v-model:current-page="currentPage" 
    v-model:page-size="page_size"
    :page-sizes="[3, 5, 7, 9]"
    size="default" 
    :background="true" 
    layout="sizes, prev, pager, next, ->,jumper,total" 
    :total="tableTotal" />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqBaseTrademark } from '../../../api/product/trademark/index'
let tableData = ref([])

const currentPage = ref<number>(1)
const page_size = ref<number>(4)
let tableTotal=ref<number>(10)
// 获取商品数据
const getTrademark = async () => {
  // 请求指定页数和数量的数据，默认第一页四个数据，可以通过点击页面对参数进行更新
  const res = await reqBaseTrademark(currentPage.value, page_size.value)
  console.log(res);
  tableData.value = res.data.records
  tableTotal.value=res.data.total
}
onMounted(() => getTrademark())
// 更改每页为几条数据时
const sizeChange=()=>{
  currentPage.value=1
  getTrademark()
}
</script>
<script lang="ts">
  export default {
    name: "trademark"
  }
</script>
<style scoped></style>