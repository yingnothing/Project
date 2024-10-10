// 封装axios
import axios from "axios";
// 拿到用户登录后的token，封装起来
import { useUserStore } from "../store/modules/user";
import { ElMessage } from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,//  /api
    timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
    // 将token携带在请求头
    // 该声明不能写在请求拦截器外面
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})
// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    let msg = ''
    let status = error.status
    switch (status) {
        case 401:
            msg = 'token过期'
            break
        case 403:
            msg = '无权访问'
            break
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";
    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
})
export default request