<template>
    <div class="login_contain">
        <el-row>
            <el-col :span="12" :xs="0">
                <div class="grid-content bg-purple">
                    1
                </div>
            </el-col>
            <el-col :span="12" :xs="24">
                <div class="grid-content bg-purple">
                  <!-- 登录表单 -->
                    <el-form class="login_form" 
                    label-width="60px" 
                    :rules="rules" 
                    :model="loginForm"
                    ref="Form"
                   >
                      <h1 style="color: white; font-size: 40px;">欢迎!</h1>
                      <h2 style="margin: 20px 0px; color: white;">请输入账号和密码</h2>
                        <el-form-item label="账号" prop="username">
                            <el-input :prefix-icon="User" type="account" v-model="loginForm.username" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password"> 
                            <el-input type="password" v-model="loginForm.password"  :prefix-icon="Lock" :show-password="true"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button class="login_btn" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
// 引入图标
import { User,Lock} from '@element-plus/icons-vue';
// 引入用户相关pinia
import { useUserStore } from '../../store/modules/user';
import { useRouter } from 'vue-router';
// 引入提示框
import { ElNotification } from 'element-plus'
// 引入route拿到当前的query参数
import { useRoute } from 'vue-router';
// 定义校验
interface RuleForm{
    username:String,
    password:String
}
// 这里的变量与input的输入相关联
const loginForm=reactive<RuleForm>({
    username:'admin',
    password:'111111'
})
// 自定义规则点失去焦点就触发函数
const validateUserName=(_rule: any, value: any, callback: any)=>{
    if(/^[a-zA-Z]{5,29}/.test(value)){
        callback()
    }else{
        callback(new Error('输入的用户名错误'))
    }
}

// 定义规则，在el-form引入规则，在el-form引入module和loginForm相关联，在el-item引入具体变量
const rules = reactive({

    username:[
        { required:true,validator: validateUserName, trigger: 'change' }
        // {message:'请输入你的用户名', trigger: 'blur'},
        // {min:4,max:6,message:'请输入4-6个字符',trigger: 'blur'}
    ],
    password:[
        {required:true,message:'请输入你的用户密码', trigger: 'blur'},
        {min:4,max:6,message:'密码为4-6个字符',trigger: 'blur'}
    ]
})
// 表单里有一个方法validate，验证是否全部通过，返回一个promise
// 获取表单
let Form=ref()
const $route=useRoute()
let redirect:any=$route.query.redirect
// 获取时间
import { getTime } from '../../utils/getTime';
const userStore=useUserStore()
const $router = useRouter() 
const mes=getTime()
// 点击登录，因为是axios请求，所以要用async
const login=async()=>{
    // 如果表单校验未完成，不进行验证
    await Form.value.validate()
    try{
        // 返回Promise，获取用户token，loginForm是响应式对象，不是loginFormData类型，会报ts错误
        // @ts-ignore
        await userStore.userLogin(loginForm)
        // 跳转,有参数就往参数上跳，否则往首页上跳
        $router.push({path:redirect||'/'})

        ElNotification({
        title: mes,
        message: '登录成功！',
        type: 'success',
     })
    }catch(err){
        ElNotification({
            message:"账号密码错误！",
            type:'error'
        })
    }
}
</script>

<style scoped>
.login_contain {
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/images/background.jpg');
    background-size: cover;
}

.login_form{
  position: relative;
  top: 30vh;
  width: 60%;
  background-image: url('../../assets/images/login_form.png') ; 
  background-size: cover;
  padding: 20px;
}
.login_btn{
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>