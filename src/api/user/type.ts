export interface loginForm{
    username:String,
    password:String
}

// 用户登录的返回类型
export interface datatype{
    token:string
}
export interface loginRespond{
    code:number,
    data:datatype
}
// 用户相关信息的返回类型
export interface user{
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes:string[],
    token:string
}
export interface infoRespond{
    code:number,
    data:user
}