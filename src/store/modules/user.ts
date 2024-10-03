import { defineStore } from 'pinia'

// 引入登录接口
import { userLogin } from '../../api/user';
// 引入类型
import { loginForm } from '../../api/user/type';
export const useUserStore = defineStore('User', {
  state: () => {
    return { 
      token: localStorage.getItem('TOKEN'),

     }
  },

  actions: {
    // 登录方法
    // 因为发送请求就会得到token，所以把token放在pinia的state里
    async userLogin(loginForm:loginForm){
        // 获取服务器数据
    const res=await userLogin(loginForm)
    console.log(res);
    
    if(res.code===200){
    // 存入token
    this.token=res.data.token
    localStorage.setItem('TOKEN',res.data.token)
    return 'ok'
    }else{
        return Promise.reject(new Error('登录失败'))
    }
    }
  },
})