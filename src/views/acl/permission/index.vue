<template>
    <div>
        <el-card>
            <el-table :data="allPermissionData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="code" label="权限值" />
                <el-table-column prop="createTime" label="修改时间" />
                <el-table-column>
                    <template #="{ row }">
                        <el-button type="primary" icon="User" size="small" :disabled="row.level == 4 ? true : false"
                            @click="addMenu(row)">{{ row.level == 3 ? '添加功能' : '添加菜单' }}
                        </el-button>
                        <el-button type="primary" icon="Edit" size="small" :disabled="row.level == 1 ? true : false"
                            @click="updateMenu(row)">编辑
                        </el-button>
                        <el-button type="primary" icon="Delete" size="small" :disabled="row.level == 1 ? true : false"
                            @click="deleteMenu(row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 对话框 -->
        <el-dialog v-model="dialogVisible" :title="!menuData.id?'添加菜单':'修改菜单'" width="500">
            <el-form >
                <el-form-item label="名称" >
                    <el-input placeholder="请你输入菜单名称" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input placeholder="请你输入权限数值" v-model="menuData.code"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="comfirmAddMenu">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { permissionResponseData, permissionDataList,MenuParams } from '../../../api/acl/menu/type';
import { onMounted, reactive, ref } from 'vue';
import { reqAllPermission,reqAddPermission,reqUpdatePermission,reqRemovePermission } from '../../../api/acl/menu';
import { ElMessage } from 'element-plus';
// 控制对话框
let dialogVisible=ref<boolean>(false)
// 收集数据
const menuData=reactive<MenuParams>({
    id:0,
    code:'',
    level:0,
    name:'',
    pid:0
})
// 存储请求发过来的数据
const allPermissionData = ref<permissionDataList>([])
// 发送请求获取全部菜单数据
const getAllPermissionData = async () => {
    const res: permissionResponseData = await reqAllPermission()
    console.log(res);
    allPermissionData.value = res.data

}
// 三个按钮
const addMenu = (row:any) => {
    dialogVisible.value=true
    Object.assign(menuData,{
    id:0,
    code:'',
    level:0,
    name:'',
    pid:0
})
menuData.pid=row.pid
menuData.level=row.level+1
}
const updateMenu = (row:any) => {
    dialogVisible.value=true
    Object.assign(menuData,row)

}
const deleteMenu = async(row:any) => {
    const res:any=await reqRemovePermission(row.id)
    if(res.code==200){
            ElMessage({type:'success',message:'删除成功'})
            getAllPermissionData()
        }else{
            ElMessage({type:'error',message:'删除失败'})
        }
}
// 确定添加菜单
const comfirmAddMenu=async()=>{
    dialogVisible.value=false
    if(!menuData.name||!menuData.code){
        return
    }
    if(!menuData.id){
        const res:any=await reqUpdatePermission(menuData)
        if(res.code==200){
            ElMessage({type:'success',message:'添加成功'})
            getAllPermissionData()
        }else{
            ElMessage({type:'error',message:'添加失败'})
        }
    }else{
        const res:any=await reqAddPermission(menuData)
        if(res.code==200){
            ElMessage({type:'success',message:'修改成功'})
            getAllPermissionData()
        }else{
            ElMessage({type:'error',message:'修改失败'})
        }
    }
}
onMounted(() => {
    getAllPermissionData()
})
</script>

<style scoped></style>