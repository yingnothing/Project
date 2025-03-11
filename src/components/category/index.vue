<template>
    <div>
                <el-card style="max-width: 100% ;margin-bottom: 20px;">
            <div class="card-header">
                <!-- 行内表单 -->
                <el-form :inline="true">
                    <el-form-item label="第一种分类">
                        <!-- selectOne拿到的是item.id -->
                        <el-select placeholder="请选择第一种分类" style="width:220px ;" v-model="attrStore.selectOne"
                            @change="hander1" :disabled="isChange">
                            <template v-for="item in attrStore.categoryOneData">
                                <el-option :label="item.name" :value="item.id">
                                </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第二种分类">
                        <el-select placeholder="请选择第二种分类" style="width:220px ;" v-model="attrStore.selectTow"
                            @change="hander2" :disabled="isChange">
                            <el-option v-for="item in attrStore.categoryTowData" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第三种分类">
                        <el-select placeholder="第三种分类" style="width:220px ;" v-model="attrStore.selectThree"
                            @change="hander3" :disabled="isChange">
                            <el-option v-for="item in attrStore.categoryThreeData" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useAttrStore } from '../../store/modules/attr';
// 若父组件拿到数据后对列表进行修改，则不能更改分类
const {isChange,SPU}=defineProps(['isChange','SPU'])
const attrStore=useAttrStore()
const hander1 = async () => {
    attrStore.selectTow = ''
    attrStore.selectThree = ''
    attrStore.categoryThreeData = []
    await attrStore.getC2()
}
// 当selectTow变化时就调用第三个接口获取数据
const hander2 = async () => {
    attrStore.selectThree = ''
    await attrStore.getC3()
}
// 当selectThree变化时就调用接口获取属性列表
const hander3 = async () => {
    // @ts-ignore
    if(!SPU){
        await attrStore.getCL()

    }
}

</script>

<style lang="scss" scoped>

</style>