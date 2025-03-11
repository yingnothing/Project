<template>
    <div>
        <category :isChange="isChange"></category>
        <!-- 下方列表渲染 -->
        <el-card v-show="!isChange">
            <div class="card-body">
                <!-- 当没有选择三个选项的话不能添加 -->
                <el-button type="primary" icon="Plus" :disabled="!attrStore.selectThree"
                    @click="addAttr">添加属性</el-button>
                <!-- 列表 -->
                <el-table :border="true" :data="attrStore.categoryList">
                    <el-table-column label="序号" type="index" width="80px">
                    </el-table-column>
                    <el-table-column label="属性名称" width="180px" prop="attrName">
                    </el-table-column>
                    <el-table-column label="属性值名称" width="auto">
                        <template #="{ row }">
                            <el-tag v-for="item in row.attrValueList" :key="row.attrValueList.id"
                                style="margin-right: 10px;">
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <!-- 按钮 -->
                    <el-table-column label="操作" width="200px">
                        <template #="{ row }">
                            <el-button link type="primary" size="small" icon="Edit" @click="toEdit(row)">修改</el-button>
                            <el-popconfirm title="确认删除？" @confirm="confirmDeleteAttr(row)">
                                <template #reference>
                                    <el-button>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 添加属性时切换到该卡片 -->
        <el-card v-show="isChange">
            <!-- 属性名称 -->
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input v-model="attrParams.attrName">
                    </el-input>
                </el-form-item>
            </el-form>
            <!-- 为该属性添加属性值 -->
            <el-button type="primary" icon="Plus" @click="addAttrValue">
                添加属性值
            </el-button>
            <el-button>
                取消
            </el-button>
            <el-table style="margin-top: 15px;" :border="true" :data="attrParams.attrValueList">
                <el-table-column label="序号" type="index" width="80px">
                </el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <!-- ref可以绑定一个函数，函数参数是该组件实例，index代表第几个对象，因为有几个对象就有几个input实例，所以也可以用于索引代表第几个组件实例 -->
                        <el-input :ref="(vc: any) => inputArr[$index] = vc" placeholder="请输入属性值名称"
                            v-model="row.valueName" v-if="row.choose" @blur="toLook(row, $index)"></el-input>
                        <div v-else @click="toChoose(row, $index)">
                            {{ row.valueName }}
                        </div>
                    </template>
                </el-table-column> <el-table-column label="属性值操作">
                    <template #="{ $index }">
                        <el-button icon="Delete" @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                    </template>

                </el-table-column>
            </el-table>
            <!-- 保存和取消按钮 -->
            <div style="margin-top: 15px;">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="isChange = false">取消</el-button>
            </div>
        </el-card>
    </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, onBeforeUnmount } from 'vue';
import { useAttrStore, } from '../../../store/modules/attr';
import { reqAddOrUpdateAttr, reqRemoveAttr } from '../../../api/product/attr';
import { ElMessage } from 'element-plus';
// @ts-ignore
import category from '../../../components/category/index.vue'

const attrStore = useAttrStore()
// 管理卡片切换及选项的可选状态
let isChange = ref(false)
// 收集新增或修改的属性数据
let attrParams: any = reactive({
    attrName: "",
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
})
// 收集每个添加的input实例，以便获取焦点
const inputArr: any = ref([])

// 添加属性
const addAttr = () => {
    // 将数据清空
    attrParams.attrName = ''
    attrParams.attrValueList = []
    isChange.value = true
}
// 修改属性
const toEdit = (row: any) => {
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
    isChange.value = true
}
// 删除属性
const confirmDeleteAttr = async (row: any) => {
    const res: any = await reqRemoveAttr(row.id)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        await attrStore.getCL()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
// 添加属性值
const addAttrValue = () => {
    // 给attrParams.attrValueList数组添加对象，从而增加input
    attrParams.attrValueList.push({
        valueName: '',
        // 增加一个判断是否被选中的标志
        choose: true
    })
    // 获取最后的el-input组件获取焦点
    nextTick(() => inputArr.value[attrParams.attrValueList.length - 1].focus())
}

// 保存属性值，发送请求
const save = async () => {
    if (attrParams.attrValueList.length === 0 || !attrParams.attrName) {
        ElMessage({
            type: 'error',
            message: '缺少必要内容'
        })
        return
    }
    isChange.value = false
    // 保存第三分类的id
    attrParams.categoryId = attrStore.selectThree
    // 发送请求
    const res: any = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })

        // 更新列表数据
        await attrStore.getCL()
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
    }
}
// 属性值输入框失去焦点时触发
const toLook = (row: any, $index: any) => {
    // 判断是否为空
    if (row.valueName) {
        // 判断是否重复
        const res = attrParams.attrValueList.find((item: any) => item.valueName === row.valueName)
        if (res !== row) {
            ElMessage({
                type: 'error',
                message: '属性值不能重复'
            })
            attrParams.attrValueList.splice($index, 1)
        } else {
            row.choose = false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        attrParams.attrValueList.splice($index, 1)
    }
}
// 选择输入框时触发
const toChoose = (row: any, $index: number) => {
    row.choose = true
    nextTick(() => inputArr.value[$index].focus())

}
onMounted(async () => {
    await attrStore.getC1()

})
onBeforeUnmount(() => {
    attrStore.$reset()
})
</script>

<style scoped>
.card-header {
    display: flex;
    align-items: center;
}
</style>