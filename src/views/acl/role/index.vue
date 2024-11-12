<template>
    <div>
        <!-- 搜索和重置 -->
        <el-card style="height: 80px;margin-bottom: 5px;">
            <el-form inline class="form" >
                <el-form-item label="用户名">
                    <el-input placeholder="角色名称" v-model="keyValue"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search" :disabled="!keyValue.length"  type="primary">搜索</el-button>
                    <el-button @click="refreshStore.refresh()"  type="primary">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <el-button icon="Plus" type="primary" @click="addRole">
                添加角色
            </el-button>
            <el-table border style="margin: 10px 0;" :data="roleArr">
                <el-table-column label="#" align="center" type="index">
                </el-table-column>
                <el-table-column label="id" align="center" prop="id">
                </el-table-column>
                <el-table-column label="角色名称" align="center" prop="roleName">
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime">
                </el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime">
                </el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template #="{row}">
                        <el-button type="primary" icon="User" size="small" @click="assignPermissions(row)">分配权限</el-button>
                        <el-button type="primary" icon="Edit" size="small" @click="updateRole(row)">编辑</el-button>
                        <el-button type="primary" icon="Delete" size="small" @click="deleteRole(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3,5, 7,]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes, total "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-card>
        <!-- 对话框 -->
    <el-dialog
    v-model="dialogVisible"
    :title="role.id?'修改职位':'添加职位'"
    width="600"
  >
    <el-form :model="role" :rules="rules" ref="formRef">
        <el-form-item label="职位名称"  prop="roleName">
            <el-input placeholder="请输入想要添加的职位" v-model="role.roleName">

            </el-input>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 分配权限抽屉 -->
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>分配用户权限</h4>
    </template>
    <template #default>
      <div>
<!-- 树形控件
 show-checkbox --复选框
  node-key="id" --树的唯一标识，在data里
default-expanded-keys --默认展开的节点的 key 的数组(对应树的id)
default-checked-keys --默认勾选的节点的 key 的数组(对应树的id)
props --配置文件，用于配置树的children或label的名称
-->
    <el-tree
        ref="tree"
        style="max-width: 600px"
        :data="permissionData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
    />
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer=false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
  
    </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from 'vue'
import { reqRoleData,reqAddOrUpdateRole,reqPermissionData,reqSetPermission,reqDeleteRole } from '../../../api/acl/role';
import { roleData, roleRecords,permissionDataArr,permissionResponseData, } from '../../../api/acl/role/type';
import useSettingIconStore from '../../../store/modules/SettingIcon';
import { ElMessage } from 'element-plus';
// 分页器
let pageNo=ref<number>(1)
let total=ref<number>(0)
let pageSize=ref<number>(5)
// 搜索关键字
let keyValue=ref('')
// 存储当前页所有职位
const roleArr=ref<roleRecords>([])
const refreshStore=useSettingIconStore()
// 获取数据并存储
const getRoleData=async(page=1)=>{
    pageNo.value=page
    const res=await reqRoleData(pageNo.value,pageSize.value,keyValue.value)
    console.log(res);
    total.value=res.data.total
    roleArr.value=res.data.records
}
// 数量改变
const handleSizeChange=()=>{
    getRoleData()
}
// 页数改变
const handleCurrentChange=()=>{
    getRoleData(pageNo.value)
}
// 树形控件
let drawer=ref<boolean>(false)
let tree=ref()
const defaultProps = {
  children: 'children',
  label: 'name',
}
let defaultCheckedKeys=ref<any>([])
// 收集修改的id数组
let permissionId=ref<number[]>([])
const permissionData=ref<permissionDataArr>()
// 分配权限确定按钮
const confirmClick=async()=>{
        // 收集新增的id和父节点的部分被选中的id
    let arr=tree.value.getHalfCheckedKeys()
    // 收集以被选用的节点
    let arr1=tree.value.getCheckedKeys()
    permissionId.value=arr.concat(arr1)
    // 发送请求
    const res:any=await reqSetPermission((role.id) as number,permissionId.value)
    console.log(res);
    if(res.code==200){
        ElMessage({
            type: 'success',
            message: '分配职位成功'
        })
        // 重置一下
        window.location.reload()
    }else {
        ElMessage({
            type: 'error',
            message: '分配失败'
        })
    }
    
    
}
// 对话框控制
const dialogVisible=ref<boolean>(false)
// 收集要添加的职位
let role=reactive<roleData>({
    roleName:'',
    id:0
})

// 搜索
const search=()=>{
    getRoleData()
    keyValue.value=''
}
// 添加职位
const addRole=()=>{
    dialogVisible.value=true
    // 清除上次表单数据
    Object.assign(role,{roleName:'',id:0})
    nextTick(()=>formRef.value.clearValidate('roleName'))
}
// 修改职位
const updateRole=(row:roleData)=>{
    dialogVisible.value=true
    Object.assign(role,row)
    nextTick(()=>formRef.value.clearValidate('roleName'))
}
const validateRoleName=(_rules:any,value:any,callback:any)=>{
    if(value.trim().length<2){
        callback(new Error('职位长度至少为两位'))
    }else{
        callback()
    }
}

// 分配权限按钮
const assignPermissions=async (row:roleData)=>{
    drawer.value=true
    Object.assign(role,row)
    const res:permissionResponseData = await reqPermissionData((row.id) as number)
    console.log(row);
    console.log(role);
    
    permissionData.value=res.data
    // 筛选出被勾选的id数组
    const getcheckKeys=(item:any)=>{
        if(item.children?.length>0){
            item.children.forEach(getcheckKeys)
        }else{
            if(item.select){
                defaultCheckedKeys.value.push(item.id)
            }
        }
    }
    permissionData.value.forEach(getcheckKeys)
   console.log(defaultCheckedKeys.value);
}
// 删除职位
const deleteRole=async(row:roleData)=>{
    const res =await reqDeleteRole((row.id as number))
    if(res.code==200){
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        // 重置一下
        window.location.reload()
    }else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
    getRoleData(roleArr.value.length>1?pageNo.value:pageNo.value-1)
}
const formRef=ref()
// 表单校验规则
const rules={
    roleName:[{require:true,trigger: 'blur',validator: validateRoleName}]
}
// 确定添加或修改职位
const confirm=async()=>{
    // 校验完成才能发请求
    await formRef.value.validate()
    dialogVisible.value=false
    const res:any=await reqAddOrUpdateRole(role)
    if(res.code==200){
        ElMessage({
            type: 'success',
            message: role.id?'修改成功':'添加成功'
        })
        pageNo.value=role.id?pageNo.value:1
        getRoleData()
    }else {
        ElMessage({
            type: 'error',
            message: role.id?'修改失败':'添加失败'
        })
    }
    
  
}
onMounted(()=>{getRoleData()})
</script>

<style scoped>
.form{
    display: flex;
    justify-content: space-between;
}
</style>
