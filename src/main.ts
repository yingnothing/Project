import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
// 小图标
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册全局组件
import globalcomponents from './components'
// 引入全局样式
import './styles/index.scss'
// 注册路由插件
import router from './router';
// pinia
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(globalcomponents)

app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router)
app.use(pinia)
app.mount('#app')