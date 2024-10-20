<template>
    <el-card style="max-width: 100%">
        <template #header>
            <div class="card-header">
                <!-- 行内表单 -->
                 <el-form :inline="true" >
                    <el-form-item label="第一种分类"> 
                        <!-- selectOne拿到的是item.id -->
                        <el-select placeholder="请选择第一种分类"    style="width:220px ;"  v-model="attrStore.selectOne" @change="hander1">
                            <template v-for="item in attrStore.categoryOneData">
                                <el-option :label="item.name" :value="item.id" >
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第二种分类"> 
                        <el-select placeholder="请选择第二种分类" style="width:220px ;" v-model="attrStore.selectTow" @change="hander2">
                            <el-option v-for="item in attrStore.categoryTowData" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第三种分类"> 
                        <el-select placeholder="第三种分类" style="width:220px ;" v-model="attrStore.selectThree" @change="hander3">
                            <el-option v-for="item in attrStore.categoryThreeData" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                 </el-form>
            </div>
        </template>
        <div class="card-body">
            <!-- 当没有选择三个选项的话不能添加 -->
            <el-button type="primary" icon="Plus" :disabled="!attrStore.selectThree">添加属性</el-button>
            <el-table :border="true" :data="attrStore.categoryList">
                <el-table-column label="序号" type="index" width="80px">
                </el-table-column>
                <el-table-column label="属性名称"  width="180px" prop="attrName">
                </el-table-column>
                <el-table-column label="属性值名称" width="auto">
                </el-table-column>
                <el-table-column label="操作" width="120px">
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, } from 'vue';
import { useAttrStore } from '../../../store/modules/attr';

const attrStore=useAttrStore()

// 当selectOne变化时就调用第二个接口获取数据
const hander1=async ()=>{
    attrStore.selectTow=''
    attrStore.selectThree=''
    attrStore.categoryThreeData=[]
    await attrStore.getC2()
}
// 当selectTow变化时就调用第三个接口获取数据
const hander2=async ()=>{
    attrStore.selectThree=''
    await attrStore.getC3()
}
// 当selectThree变化时就调用接口获取属性列表
const hander3=async ()=>{
    await attrStore.getCL()
}
onMounted(async()=>{
    await attrStore.getC1()
    
})
</script>

<style scoped>
.card-header {
    display: flex;
    align-items: center;
}
  
</style>