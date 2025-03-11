// 设置路由守卫，切换路由时就会执行
import router from "./router";
// 引入进度条样式，否则不会生效
import 'nprogress/nprogress.css'
// 没有setup得导入才能用
import pinia from "./store";
import { useUserStore } from "./store/modules/user";
// 添加进度条
// @ts-ignore
import nprogress from 'nprogress'
const userStore = useUserStore(pinia)
router.beforeEach(async (to, _from:any, next) => {
    document.title='广工平台~'+to.meta.title as string
    nprogress.start()
    // 先判断token，判断是否登录
    if (userStore.token) {
        // 已登录，所以不能回到登录页面
        if (to.path === '/login') {
            // 若是要到登录页，自动返回到首页
            next('/')
        } else {            
            // 去其它任何地方，先判断是否已通过token拿到用户信息(即发送请求并存在pinia中)
            if (userStore.username) {
                next()
            } else {// 用户信息被刷新了
                try {                
                    // 这个是通过token向服务器发送请求，所以可能失败
                    await userStore.getUserInfo()
                    // 发送完信息后再放行，...to是告诉 Vue Router 重新匹配当前路由。
                    next({...to})
                } catch(error) {
                    // token过期，拿不到用户数据,进行退出登录操作
                    await userStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}})
                    // router.push({path:'/login',query:{redirect:to.path}})
                    //  next();
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            // 未登录，只能访问登录页面
            next({ path: '/login' })
        }

    }

})
router.afterEach((_to, _from) => {
    nprogress.done()
})