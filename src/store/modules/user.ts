// 用户仓库
import { defineStore } from 'pinia'

// 引入登录接口
import { reqLogin,reqUserInfo,reqLogout } from '../../api/user';
// 引入类型
import { loginFormData,loginRespondData,userInfoResponseData} from '../../api/user/type';
// 引入路由
import { asyncRoute,constantRoute,anyRoute } from '../../router/routes';
// @ts-ignore
import { cloneDeep } from 'lodash'
import router from '../../router';
// 过滤出能访问的路由的数组
function filterRoute(asyncRoute:any,routeArr:string[]){
  return asyncRoute.filter((item:any)=>{
    if(routeArr.includes(item.name)){
      // 对children进行过滤
      if(item.children&&item.children.length>=1){
        item.children=filterRoute(item.children,routeArr)
      }
      return true
    }
  })
}

export const useUserStore = defineStore('User', {
  state: () => {
    return { 
      token: localStorage.getItem('TOKEN')||'',
      username:'',
      avatar:'',
      routeArr:[] as string[],
      menuRoutes:[] as any,
      buttonArry:[] as string[]
     }
  },

  actions: {
    // 点击登录调用的方法
    // 因为发送请求就会得到token，所以把token放在pinia的state里
    async userLogin(loginForm:loginFormData){
    // 获取服务器数据
    const res:loginRespondData=await reqLogin(loginForm)
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
      const res:userInfoResponseData=await reqUserInfo()
      // 如果成功，则将用户信息存在pinia中，方便其它组件进行渲染
      if(res.code===200){
        console.log(res);
        
        this.username=res.data.name
        this.avatar=res.data.avatar
        this.buttonArry=res.data.buttons
        // 路由部分
        // 拿到拥有的路由路径
        this.routeArr=res.data.routes
        
        // 过滤出路由数组
        const userAsyncRoute:any=filterRoute(cloneDeep(asyncRoute),this.routeArr)

        // 最终的菜单路由数组
        this.menuRoutes=[...constantRoute,...userAsyncRoute,...anyRoute] ;
        // 路由目前只有constantRoute
        [...userAsyncRoute,...anyRoute].forEach((route)=>{
          router.addRoute(route)
        })
               
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