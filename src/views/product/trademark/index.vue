<!-- 品牌管理 -->
<template>
  <!-- 卡片 -->
  <el-card style="max-width: 100%">
    <el-button type="primary" icon="Plus" @click="add">添加品牌</el-button>
    <!-- 表格组件
    tableData 表格数据
    label 数据标签
     
    -->
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
        <template v-slot:default="{ row }">
          <el-button link type="primary" size="small" icon="Edit" @click="edit(row)">修改</el-button>
          <el-button link type="danger" size="small" icon="Delete" @click="deleteTrademark">
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
    <!-- 弹窗组件，用于添加商品 -->
     <el-dialog v-model="dialogFormVisible" :title="dialogForm.id?'修改品牌名称或logo':'添加品牌名称及logo'" width="40%" center top="25vh">
      <el-form :model="dialogForm" :rules="rules" style="width: 80%;">
        <el-form-item label="输入名称:" prop="tmName" label-width="130px">
          <el-input v-model="dialogForm.tmName" width="200px"/>
        </el-form-item>
        <el-form-item label="上传该品牌的logo" label-width="130px">
          <!--
           上传图片组件
           action 要将图片上传到的服务器的地址，当上传图片时就会发送请求，要在接口文档地址前面加上api，服务器将会返回文件的访问 URL
           show-file-list：将上传成功的图片进行展示
           before-upload 在上传图片之前执行的钩子（函数），参数是本次上传的文件，可以在这里对文件格式进行限制
           on-success 成功后执行的函数，将图片地址赋值给dialogForm.logoUrl
            -->
            <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="dialogForm.logoUrl" :src="dialogForm.logoUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
      </el-form>
      <!-- footer部分，提供确定和取消 -->
      <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
     </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref,reactive } from 'vue'
import { reqBaseTrademark,addTrademark,editTrademark } from '../../../api/product/trademark/index'
import { ElMessage, UploadProps } from 'element-plus';
let tableData = ref([])

const currentPage = ref<number>(1)
const page_size = ref<number>(4)
let tableTotal=ref<number>(10)
// 更改每页为几条数据时
const sizeChange=()=>{
  currentPage.value=1
  getTrademark()
}
// 控制对话窗是否出现
const dialogFormVisible=ref(false)
// 输入框的值
const dialogForm=reactive({
  id:undefined,
  tmName:'',
  logoUrl:''
})
// 添加品牌
const add=()=>{
  // 将对话框里面的数据先清空
  dialogForm.id=undefined
  dialogForm.tmName=''
  dialogForm.logoUrl=''
  dialogFormVisible.value=true
}
// 获取商品数据
const getTrademark = async () => {
  // 请求指定页数和数量的数据，默认第一页四个数据，可以通过点击页面对参数进行更新
  const res = await reqBaseTrademark(currentPage.value, page_size.value)
  tableData.value = res.data.records
  tableTotal.value=res.data.total
}
// 自定义弹窗规则
const rules = reactive({
    tmName:[
        {required:true,message:'输入品牌名称', trigger: 'blur'},
        {min:2,message:'名称长度至少为2',trigger: 'blur'}
    ]
})
onMounted(() => getTrademark())
// 点击编辑执行该函数
const edit=(row:any)=>{
  Object.assign(dialogForm,row)
  dialogFormVisible.value=true
  
  
}
// 点击删除执行该函数
const deleteTrademark=()=>{
  dialogFormVisible.value=true
}
// 点击取消执行该函数
const cancel=()=>{
  dialogFormVisible.value=false
}
// 点击确定执行该函数
const confirm=async ()=>{
  let res:any
  if(dialogForm.id){
    console.log(dialogForm);
    
    res=await editTrademark(dialogForm)
    console.log(res);
    
  }else{
  // 向服务器发送请求添加数据，需要名称和图片地址
  res=await addTrademark(dialogForm)  
  }

  // try不会捕获服务器返回的业务逻辑错误，所以要自己判断
  if(res.code===200){
    ElMessage({
      type:'success',
      message:dialogForm.id?'已成功修改(*^_^*)':'已成功添加(*^_^*)'
    })
    // 更新分页器
    getTrademark()
  }else{
    ElMessage({
      type:'error',
      message:dialogForm.id?'修改品牌失败/(ㄒoㄒ)/~~':'添加品牌失败/(ㄒoㄒ)/~~'
    })
  }
  dialogFormVisible.value=false
}
//上传图片前执行的函数，参数为文件对象 
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile:any) => {
  
  if(rawFile.type==='image/pgn'||rawFile.type==='image/gif'||rawFile.type==='image/jpeg'||rawFile.type==='image/svg'){
   
    if(rawFile.size/1024/1024<5){
      
      return true      
    }else{
      return false
    }
  }else{
    return false
  }
}
// 上传图片成功后执行的函数,response为向服务器上传图片后服务器返回的数据，uploadFile也是，但还包含了图片的一些信息
const handleAvatarSuccess: UploadProps['onSuccess'] = (response:any,_uploadFile:any) => {
  // response.data即为上传成功后图片的地址
  dialogForm.logoUrl=response.data
}
</script>
<script lang="ts">
  export default {
    name: "trademark"
  }
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>