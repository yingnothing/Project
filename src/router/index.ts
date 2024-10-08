import {createRouter,createWebHashHistory} from 'vue-router'
import { constantRoute } from './routes'
// 路由规则类型
const router=createRouter({
    history:createWebHashHistory(),
    routes:constantRoute,
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
      },
})
export default router