// 自定义插件实现注册全局组件
// 获取所有组件实例构成一个对象，再转为数组，然后再注册
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 注册全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents={SvgIcon,Pagination}
export default{
    install(app: any){
        Object.keys(allGlobalComponents).forEach(key=>{
            app.component(key,allGlobalComponents[key as keyof typeof allGlobalComponents])
        })
        // 将图标组件注册到全局
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}