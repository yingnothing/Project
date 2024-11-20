
// 登录发送请求携带的参数
export interface loginFormData{
    username:string,
    password:string
}
// 服务器返回的通用数据格式
export interface responseData{
    code:number,
    message:string,
    ok:boolean
}
// 登录接口返回的数据类型
export interface loginRespondData extends responseData{
    data:string
}
// 获取用户信息返回的数据类型
export interface userInfoResponseData extends responseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string,
    }
}
