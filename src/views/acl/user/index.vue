<template>
    <div>
        <!-- 搜索 -->
        <el-card style="height: 80px;margin-bottom: 5px;">
            <el-form inline class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" v-model="keyVlaue"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 表格 -->
        <el-card>
            <el-button @click="addUser">添加</el-button>
            <el-button @click="deleteSelectUser" :disable="selectUser.length?false:true">批量删除</el-button>
            <el-table :border="true" style="margin: 10px 0;" :data="userArr" @selection-change="selectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column label="#" align="center" type="index">
                </el-table-column>
                <el-table-column label="id" align="center" prop="id">
                </el-table-column>
                <el-table-column label="用户名字" align="center" prop="username">
                </el-table-column>
                <el-table-column label="用户名称" align="center" prop="name">
                </el-table-column>
                <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
                        <el-button type="primary" size="small" icon="Delete" @click="deletUser(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,total,sizes" :total="userTotal"
                @current-change="handleCurrentChange" />
        </el-card>
        <!-- 用户抽屉 -->
        <el-drawer v-model="drawer" direction="rtl">
            <template #header>
                <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
            </template>
            <template #default>
                <div>
                    <el-form :model="userParams" :rules="rules" ref="formRef">
                        <el-form-item label="用户姓名" prop="username">
                            <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                        </el-form-item>
                        <el-form-item label="用户昵称" prop="name">
                            <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                            <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </template>
        </el-drawer>
        <!-- 分配角色抽屉 -->
        <el-drawer v-model="drawer1">
            <template #header>
                <h4>分配角色职位</h4>
            </template>
            <template #default>
                <div>
                    <el-form>
                        <el-form-item label="用户姓名">
                            <el-input v-model="userParams.name" :disabled="userParams.id ? true : false"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <template #="{ row }">
                                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                                <el-checkbox-group v-model="assignRoles" @change="handleCheckedCitiesChange">
                                    <!-- value绑定的是v-model变化的值，如果不写{{ item.roleName }}，那么显示的就是label的值 -->
                                    <el-checkbox v-for="(item, index) in allRolesList" :key="index" :label="item"
                                        :value="item">
                                        {{ item.roleName }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="drawer1 = false">取消</el-button>
                    <el-button type="primary" @click="setUserRole">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAllUser, reqpdateOrAddUser, reqUserRole, reqSetUserRole, reqRemoveRole, batchRemoveUser } from '../../../api/acl/user';
import type { UserResponseData, Records, User, userRoleArr, userRoleResponseData, setRoleData, userRole } from '../../../api/acl/user/type';
import { ElMessage } from 'element-plus';
import useSettingIconStore from '../../../store/modules/SettingIcon'
// 默认页面
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
// 所有用户信息
let userArr = ref<Records>([])
// 用户总数
let userTotal = ref<number>(0)
// 多选框选中的用户
let selectUser=ref<userRoleArr>([])
// 存储新增或修改的用户信息
let userParams = reactive<User>({
    name: '',
    username: '',
    password: ''
})
// 控制抽屉的显示与隐藏
const drawer = ref<boolean>(false)
// 收集搜索关键字
const keyVlaue=ref('')
const settingStore=useSettingIconStore()

// 控制分配角色部分抽屉的数据
// 控制角色抽屉的显示与隐藏
const drawer1 = ref<boolean>(false)
// 存储所有可以分配的角色列表
const allRolesList = ref<userRoleArr>([])
// 存储该用户已拥有的角色列表
const assignRoles = ref<userRoleArr>([])
// 控制全选框是否全选
const checkAll = ref<boolean>(false)
// 设置全选框显示为不确定
const isIndeterminate = ref<boolean>(true)
// 全选框change事件，参数为是否选中
const handleCheckAllChange = (val: boolean) => {
    console.log(val);
    // 点击将用户可选择的职位置为空或全 
    assignRoles.value = val ? allRolesList.value : []
    // 取消不确定状态
    isIndeterminate.value = false
}
// 点击任一复选框触发的事件，参数是已经选中的集合
const handleCheckedCitiesChange = (value: string[]) => {
    console.log(value);

    const checkedCount = value.length
    // 判断是否全选改变checkAll
    checkAll.value = checkedCount === allRolesList.value.length
    //   判断是否全选改变不确定状态框
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRolesList.value.length
}

// 搜索
const search=()=>{
    getHasUser()
}
// 重置
const reset=()=>{
    settingStore.refresh()
}
// 分配角色按钮
const setRole = async (row: User) => {
    // 发送请求并存储数据
    Object.assign(userParams, row)
    const res: userRoleResponseData = await reqUserRole((row.id) as number)
    console.log(res);
    allRolesList.value = res.data.allRolesList
    assignRoles.value = res.data.assignRoles

    drawer1.value = true
}
// 修改角色信息按钮
const setUserRole = async () => {
    // 封装请求参数
    const role: setRoleData = {
        roleIdList: assignRoles.value.map((item: userRole) => { return (item.id) as number }),
        userId: (userParams.id) as number
    }

    const res: any = await reqSetUserRole(role)
    console.log(res);
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '修改成功'
        })
        await getHasUser(pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: '修改失败'
        })
    }
    drawer1.value = false
}
// 多选框发生变化
const selectionChange=(val:userRoleArr)=>{
// val为选中的多选框的row数组
selectUser.value=val
}
// 批量删除用户
const deleteSelectUser=async()=>{
    let idList:number[]=selectUser.value.map((item)=>{
        return (item.id) as number
    })
    const res:any=await batchRemoveUser(idList)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
}else{
    ElMessage({
            type: 'error',
            message: '删除失败'
        })
}
}

// 获取form表单实例，以便执行组件方法
let formRef = ref()
// 名字校验函数
const validateName = (_rule: any, value: any, callback: any) => {
    value.trim().length >= 5 ? callback() : callback(new Error('用户名字至少5位'))
}
const validateUserName = (_rule: any, value: any, callback: any) => {
    value.trim().length >= 5 ? callback() : callback(new Error('用户昵称至少5位'))
}
const validatePass = (_rule: any, value: any, callback: any) => {
    value.trim().length >= 6 ? callback() : callback(new Error('用户密码至少6位'))
}
// 自定义规则
const rules = {
    name: [{ required: true, trigger: 'blur', validator: validateName }],
    username: [{ required: true, trigger: 'blur', validator: validateUserName }],
    password: [{ required: true, trigger: 'blur', validator: validatePass }]
}

// 获取已有的用户信息用户
const getHasUser = async (page = 1) => {
    const res: UserResponseData = await reqAllUser(page, pageSize.value,keyVlaue.value)
    userArr.value = res.data.records
    userTotal.value = res.data.total
}
// 添加用户
const addUser = () => {
    Object.assign(userParams, {
        id: 0,
        name: '',
        username: '',
        password: ''
    })
    drawer.value = true
    // 清空校验信息
    nextTick(() => {
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('password')
    })

}
// 编辑用户
const editUser = (row: User) => {
    userParams = row
    drawer.value = true
}
// 删除用户
const deletUser = async (row: User) => {
    const res = await reqRemoveRole((row.id) as number)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasUser()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
// 保存用户
const save = async () => {
    await formRef.value.validate()
    const res: any = await reqpdateOrAddUser(userParams)
    console.log(res);
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        })
        // 成功了就重新发送请求更新数据
        await getHasUser(userParams.id ? pageNo.value : 1)
        // 刷新浏览器
        window.location.reload()
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
    }
    drawer.value = false

}
// 取消
const cancel = () => {
    drawer.value = false
}
// 切换页数
const handleCurrentChange = () => {
    getHasUser(pageNo.value)
}
onMounted(() => {
    getHasUser()
})

</script>

<style scoped>
.form {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>