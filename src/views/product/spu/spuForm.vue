<template>
    <div>
        <el-card>
            <el-form label-width="auto">
                <el-form-item label="SPU名称">
                    <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
                </el-form-item>
                <el-form-item label="SPU品牌">
                    <el-select placeholder="请选择" style="width: 240px" v-model="SpuParams.tmId">
                        <el-option v-for="item in allTrademark" :label="item.tmName" :value="item.id"
                            :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="SPU描述">
                    <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
                </el-form-item>
                <el-form-item label="SPU图标">
                    <!--
                    on-preview--点击图片执行的代码
                    on-remove -- 删除文件时执行的代码
                    before-upload--上传图片前执行的代码
                      -->
                    <el-upload v-model:file-list="fileList" action="/api/admin/product/fileUpload"
                        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                        :before-upload="beforeUpload">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" style="width: 400px; height: 400px;">
                        <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="SPU销售属性">
                    <!-- 需要把所选择的销售属性名称和id都传给saleAttr -->
                    <el-select :placeholder="unoptionSaleAttr.length ? `还有${unoptionSaleAttr.length}个属性未选择` : `暂无更多属性`"
                        style="width: 240px" v-model="saleAttr">
                        <el-option v-for="item in unoptionSaleAttr" :key="item.id" :label="item.name"
                            :value="`${item.id}+${item.name}`"></el-option>
                    </el-select>
                    <el-button type="primary" icon="Plus" style="margin-left: 10px;" @click="addSaleAttr"
                        :disabled="!saleAttr">添加属性值</el-button>
                    <el-table :border="true" style="margin: 10px 0;" :data="spuHasSaleAttr">
                        <el-table-column label="序号" type="index" width="80px">
                        </el-table-column>
                        <el-table-column label="销售属性名字" prop="saleAttrName">
                        </el-table-column>
                        <el-table-column label="销售属性值">
                            <template #="{ row, }">
                                <el-tag v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag?.saleAttrValueName"
                                    closable @close=" row.spuSaleAttrValueList.splice(index, 1)" :type="tag?.type"
                                    style="margin-right: 5px;">
                                    {{ tag?.saleAttrValueName }}
                                </el-tag>
                                <el-button icon="plus" type="primary" size="small" @click="addSaleAttrValue(row)"
                                    v-if="!row.flag">
                                </el-button>
                                <!-- row.saleAttrValue在row身上是没有的，这里自己加上 -->
                                <el-input v-else placeholder="请输入属性值" v-model="row.saleAttrValue" @blur="blurinput(row)"
                                    style="width: 110px;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #="{ $index }">
                                <el-button icon="Delete" type="primary" size="small" @click="deleteSaleAttr($index)">

                                </el-button>
                            </template>

                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button type="primary" @click="cancle">取消</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { reqAllTrademark, reqImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reaAddOrUpdateSPU } from '../../../api/product/spu';
import { ElMessage } from 'element-plus';
// 拿到父组件传过来的方法
const $emit = defineEmits(['changeScene'])
//  发送请求接收的数据
const allTrademark = ref()
const imageList = ref<any>([])
const spuHasSaleAttr = ref<any[]>([])
const allSaleAttr = ref<any[]>([])

// 用于存储点击图片的地址
const dialogImageUrl = ref<string>('')
// 控制点击图片时的切换
const dialogVisible = ref(false)


// 存储照片墙
let fileList = ref<any[]>([])
// 存储所选择的销售属性
let saleAttr = ref()

// 存储从接口获取的数据
const SpuParams: any = ref({
    category3Id: '',
    spuName: '',
    tmId: '',
    description:'',
    spuImageList: [],
    spuSaleAttrList: [],
})


// 点击已上传的图片时执行的代码，参数是图片对象
const handlePictureCardPreview = (uploadFile: any) => {
    console.log(uploadFile);
    // 将所点图片url绑定到对话框的img中
    dialogImageUrl.value = uploadFile.url
    // 显示对话框
    dialogVisible.value = true
}
// 删除图片时执行的函数
const handleRemove = () => {

}
// 上传图片
const beforeUpload = (file: any) => {
    if (file.type === 'image/pgn' || file.type === 'image/gif' || file.type === 'image/jpeg' || file.type === 'image/svg' || file.type === 'image/svg+xml') {
        if (file.size / 1024 / 1024 < 5) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件不能大于5M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '只能上传图片'
        })
        return false
    }
}
// 添加销售属性
const addSaleAttr = () => {
    // saleAttr存储了所选择的名称和id，准备成一个对象将来发给服务器
    const arr = saleAttr.value.split('+')
    const [baseSaleAttrId, saleAttrName] = arr
    let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    spuHasSaleAttr.value.push(newSaleAttr)
    saleAttr.value = ''
}
// 添加销售属性值
const addSaleAttrValue = (row: any) => {
    // 把输入框内容清空并切换程input
    row.saleAttrValue = ''
    row.flag = true

}
// 添加属性值完成失去焦点
const blurinput = (row: any) => {
    // 对输入的属性值进行非法判断
    if (!row.saleAttrValue) {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        row.flag = false
        return
    }
    else if (row.spuSaleAttrValueList.find((item:any) => item.saleAttrValueName === row.saleAttrValue)) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }
    // 切换
    row.flag = false
    // 收集添加属性的id和属性值名称
    const { baseSaleAttrId, saleAttrValue } = row
    let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue)

}
// 删除销售属性
const deleteSaleAttr = ($index: any) => {
    spuHasSaleAttr.value.splice($index, 1)
}
// 存储还未被选择的销售属性,需要随时更新
let unoptionSaleAttr = computed(() => {
    // allSaleAttr包括 id:1   name:"颜色"
    // 对所有可以选择的属性进行遍历，如果sku(spuHasSaleAttr)未添加该属性，则返回true，以存到新数组中
    return allSaleAttr.value.filter(item1 => {
        // every() 方法用于检测数组所有元素是否都符合指定条件
        return spuHasSaleAttr.value.every(item2 => {
            return item2?.saleAttrName !== item1.name
        })
    })
})
// 保存按钮
const save = async () => {
    // 整理数据
    // 将图片改为服务器需要的格式
    SpuParams.value.spuImageList = fileList.value.map(item => {
        return {
            imgName: item.name,
            imgUrl: item.url
        }
    })
    // 存储修改的销售属性,包括销售属性名字，销售属性id，销售属性值数组
    SpuParams.value.spuSaleAttrList = spuHasSaleAttr.value
    // 发送数据
    const res: any = await reaAddOrUpdateSPU(SpuParams.value)
    console.log(res);
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '保存成功'
        })

    }
    else {
        ElMessage({
            type: 'error',
            message: '保存失败'
        })
    }
    $emit('changeScene', 0,SpuParams.id)
}

//  取消按钮
const cancle = () => {
    $emit('changeScene', 0,SpuParams.id)
}
// 初始化，点击修改则发送请求获取初始数据，需要暴露在父组件中被调用
const initSkuData = async (row: any) => {
    let res
    res = await reqAllTrademark()
    allTrademark.value = res.data
    console.log(row);

    res = await reqImageList(row.id)
    // 照片墙
    imageList.value = res.data
    // 将照片格式转为组件规定的格式
    fileList.value = imageList.value.map((item:any) => {
        return {
            name: item.imgName,
            url: item.imgUrl,
        }
    })
    res = await reqSpuHasSaleAttr(row.id)
    spuHasSaleAttr.value = res.data
    res = await reqAllSaleAttr()
    allSaleAttr.value = res.data
    SpuParams.value = row
}
// 初始化，点击添加则发送请求获取初始数据，需要暴露在父组件中被调用
const initAddSpu=async(category3Id:number|string)=>
{
    // 清空数据
    Object.assign(SpuParams.value,{
    category3Id: '',
    spuName: '',
    tmId: '',
    description:'',
    spuImageList: [],
    spuSaleAttrList: [],
})
// 清空照片
imageList.value=[]
fileList.value=[]
// 清空属性
saleAttr.value=[]
spuHasSaleAttr.value=[]
    // 存储三级分类id
    SpuParams.value.category3Id=category3Id
    let res
    // 获取SPU品牌
    res = await reqAllTrademark()
    allTrademark.value = res.data
    // 获取SPU销售属性
    res = await reqAllSaleAttr()
    allSaleAttr.value = res.data
}
defineExpose({
    initSkuData,
    initAddSpu
});
</script>

<style scoped></style>