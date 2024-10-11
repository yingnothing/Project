// 用户仓库
import { defineStore } from 'pinia'

// 引入登录接口
import { reqLogin,reqUserInfo,reqLogout } from '../../api/user';
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
    const res=await reqLogin(loginForm)
    if(res.code===200){
    // 存入token
    this.token=res.data
    localStorage.setItem('TOKEN',res.data)
    return 'ok'
    }else{
        return Promise.reject(new Error('登录失败'))
    }
    },
    // 获取用户信息方法
    async getUserInfo(){
      const res=await reqUserInfo()
      console.log(res);
      // 如果成功，则将用户信息存在pinia中，方便其它组件进行渲染
      if(res.code===200){
         // @ts-ignore
        this.username=res.data.username
         // @ts-ignore
        this.avatar=res.data.avatar
        return 'ok';
      }else{
        return Promise.reject(new Error(res.message))
      }
      
    },
    // 退出登录
    async userLogout(){
      let res=await reqLogout()
      if(res.code==200){
        this.username=''
        this.avatar=''
        // 这个token的清除或者是放在一个公共的地方
        this.token=''
        // localStorage.setItem('TOKEN',''),应该使用remove
        localStorage.removeItem('TOKEN')
        return 'ok'
      }else{
        return Promise.reject(new Error(res.message))
      }
    },
    // 清除用户信息
    clearUserMessage(){
      this.username=''
      this.avatar=''
      // 这个token的清除或者是放在一个公共的地方
      this.token=''
      // localStorage.setItem('TOKEN',''),应该使用remove
      localStorage.removeItem('TOKEN')
    }
  },
})