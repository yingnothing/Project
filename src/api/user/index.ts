// 封装与用户相关的请求的API
import request from "../../utils/request";
import { loginForm,loginRespond,infoRespond } from "./type";
// 登录接口
export const userLogin=(data:loginForm)=>{
    return request.post<any,loginRespond>('/user/login',data)
}
// 获取用户信息接口
export const userInfo=()=>{
    return request.get<any,infoRespond>('/user/info')
} 