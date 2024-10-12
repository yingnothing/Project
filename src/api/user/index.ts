// 封装与用户相关的请求的API

import request from "../../utils/request";
import { loginFormData,loginRespondData,userInfoResponseData } from "./type";
enum API {
    LOGIN_URL="/admin/acl/index/login",
    USERINFO_URL="/admin/acl/index/info",
    LOGOUT_URL="/admin/acl/index/logout"
}

// 登录接口
export const reqLogin=(data:loginFormData)=>request.post<any,loginRespondData>(API.LOGIN_URL,data)
// 获取用户信息
export const reqUserInfo=()=>request.get<any,userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL)














// import { loginForm,loginRespond,infoRespond } from "./type";
// // 登录接口
// export const userLogin=(data:loginForm)=>{
//     return request.post<any,loginRespond>('/user/login',data)
// }
// // 获取用户信息接口,因为是通过请求头携带参数，所以这里不用带参数
// export const userInfo=()=>{
//     return request.get<any,infoRespond>('/user/info')
// } 