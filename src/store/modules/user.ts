// 用户仓库
import { defineStore } from 'pinia'

// 引入登录接口
import { userLogin,userInfo } from '../../api/user';
// 引入类型
import { loginForm } from '../../api/user/type';
export const useUserStore = defineStore('User', {
  state: () => {
    return { 
      token: localStorage.getItem('TOKEN')||'',
      username:'',
      avatar:''
     }
  },

  actions: {
    // 点击登录调用的方法
    // 因为发送请求就会得到token，所以把token放在pinia的state里
    async userLogin(loginForm:loginForm){
        // 获取服务器数据
    const res=await userLogin(loginForm)
    
    if(res.code===200){
    // 存入token
    this.token=res.data.token
    localStorage.setItem('TOKEN',res.data.token)
    return 'ok'
    }else{
        return Promise.reject(new Error('登录失败'))
    }
    },
    // 获取用户信息
    async userInfo(){
      const res=await userInfo()
      console.log(res);
      // 如果成功，则将用户信息存在pinia中，方便其它组件进行渲染
      if(res.code===200){
         // @ts-ignore
        this.username=res.data.checkUser.username
         // @ts-ignore
        this.avatar=res.data.checkUser.avatar
      }else{

      }
      
    }
  },
})