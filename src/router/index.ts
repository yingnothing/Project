import {createRouter,createWebHashHistory} from 'vue-router'
import login from '../views/login/index.vue'
import layout from '../views/layout/index.vue'
import err from '../views/404/index.vue'
const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:layout
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/404',
            component:err
        },
        {
            path: '/:pathMatch(.*)*',
            redirect:'/404',
            name:'Any'
        }

    ],
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
      },
})
export default router